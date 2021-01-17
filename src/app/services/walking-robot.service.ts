import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Direction } from './direction';

@Injectable({
  providedIn: 'root'
})
export class WalkingRobotService {

  public form = new Subject<string>();

  // Create directions
  private directions: Direction[] = [
    {
      id: 1, name: 'North', shortname: 'N'
    },
    {
      id: 2, name: 'East', shortname: 'E'
    },
    {
      id: 3, name: 'South', shortname: 'S'
    },
    {
      id: 4, name: 'West', shortname: 'W'
    }    
  ];

  position: object = {};

  successStatus: Boolean = true;

  msgStatus: String = '';
  
  constructor() { }

  // Reset status and message to default values
  resetStatus() {
    this.successStatus = true;
    this.msgStatus = '';
  }

  // Get directions object and return it
  getDirections(): Observable<Direction[]> {
    return of (this.directions);
  }

  // Get directions object and return it
  getDirectionShortnameByPosition() {
    let foundIndex = this.findIndexByPosition()
    return this.directions[foundIndex]['shortname'];
  }

  findIndexByPosition() {
    let findIndex = this.directions;    
    let found = findIndex.findIndex(obj => obj.id == this.position['directionId']);
    return found;
  }

  checkDeployrobotForm(form): Observable<Object> {

    // Check width and height values of size
    if (form.sizeWidth < 1 || form.sizeHeight < 1) {
      this.msgStatus = "Minimum values of size must be 1x1. Please try again";
      this.successStatus = false;
    // Check width and height values of location
    } else if (form.locationWidth < 0 || form.locationHeight < 0) {
      this.msgStatus = "Minimum values of location 0x0. Please try again.";
      this.successStatus = false;
    // Check if direction is set
    } else if (form.direction < 1) {
      this.msgStatus = "Please choose a direction to the robot.";
      this.successStatus = false;
      // Check if robot's location is valid with the size of the room.
    } else if (form.locationWidth > form.sizeWidth || form.locationHeight > form.sizeHeight) {
      this.msgStatus = "The robot cannot be placed outside the defined room. Please try again.";
      this.successStatus = false;
    }

    let obj = {success: this.successStatus, msg: this.msgStatus}
    this.resetStatus();
    return of (obj);
  }

  checkMovingRobotCommands(commands): Observable<Object> {

    // Check with Regex if commands is in right value.
    let regex = /^[LRF]+$/;
    if (!commands.match(regex)) {
      this.msgStatus = "You have added wrong commands in the input field. Please try again.";
      this.successStatus = false;
    }    
    let obj = {success: this.successStatus, msg: this.msgStatus}
    this.resetStatus();
    return of (obj);
  }

  // Begin to move robot by changing values on position variable
  moveRobot(commands): Observable<Object> {
    this.runningCommands(commands);
    let obj = this.position;
    // Set shortname of direction before returning object
    obj['shortname'] = this.getDirectionShortnameByPosition();
    return of (obj);
  }

  deployRobot(form) { 
    this.position = form;   
    this.form.next(form);
  
  
  }
  
  runningCommands(commands) {
    for (let i in commands) {
      // Turning left
      if (commands[i] == 'L') {
        this.position['directionId'] = this.turnLeft();
      // Turning right
      } else if (commands[i] == 'R') {
        this.position['directionId'] = this.turnRight();
      // Move forward        
      } else if (commands[i] == 'F') {
        this.moveForward();
      }
    }
  }

  turnLeft() {
    let index = this.findIndexByPosition();
    let movedPosition = 0;
    // If it is first item, slice the directions array and get the last object item
    if (index == 0) {
      let slicedPosition = this.directions.slice(-1)[0];      
      movedPosition = slicedPosition.id;
    // reduce index number by 1 and find the object in directions array by the new index number
    } else {
      let modifyIndex = index - 1;      
      movedPosition = this.directions[modifyIndex]['id'];
    }    
    return movedPosition;
  }

  turnRight() {
    let index = this.findIndexByPosition();
    let movedPosition = 0;

    // Get the last index number from directions
    let lastIndex = this.directions.length-1;
    // If it is last item, slice the directions array and get the first object item
    if (index == lastIndex) {
      let firstPosition = this.directions[0];
      movedPosition = firstPosition.id;
    } else {
      let modifyIndex = index + 1;      
      movedPosition = this.directions[modifyIndex]['id'];
    }    
    return movedPosition;
  }

  moveForward() {
    // Set all variables from position
    let positionId = this.position['directionId'];
    let positionWidth = this.position['locationWidth'];
    let positionHeight = this.position['locationHeight'];
    let sizeWidth = this.position['sizeWidth'];
    let sizeHeight = this.position['sizeHeight'];
    
    // North
    if (positionId == 1) {
      //  Increase value of height and check if it is valid
      let calculateHeight = positionHeight + 1;
      if (sizeHeight >= calculateHeight) {
        this.position['locationHeight'] = calculateHeight;
      }

    // East
    } else if (positionId == 2) {
      //  Increase value of width and check if it is valid
      let calculateWidth = positionWidth + 1;
      if (sizeWidth >= calculateWidth) {
        this.position['locationWidth'] = calculateWidth;
      }
    // South
    } else if (positionId == 3) {
      //  Decrease value of height and check if it is valid
      let calculateHeight = positionHeight - 1;
      if (calculateHeight >= 0 ) {
        this.position['locationHeight'] = calculateHeight;
      }
    // West
    } else if (positionId == 4) {
      //  Decrease value of width and check if it is valid
      let calculateWidth = positionWidth - 1;
      if (calculateWidth >= 0 ) {
        this.position['locationWidth'] = calculateWidth;
      }
    }
  }    
}
