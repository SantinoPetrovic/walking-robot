import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { WalkingRobotService } from '../../services/walking-robot.service';

@Component({
  selector: 'app-move-robot-form',
  templateUrl: './move-robot-form.component.html',
  styleUrls: ['./move-robot-form.component.css']
})
export class MoveRobotFormComponent implements OnInit {
  moveRobotShow: boolean = false;

  // Wait for subscription
  deployFormSubscription: Subscription;

  // Deploy robot form
  moveRobotForm = this.formBuilder.group({
    robotCommands: ''
  });

  position: Object = {};

  constructor(
    private formBuilder: FormBuilder,
    private walkingRobotService: WalkingRobotService
  ) {
    this.deployFormSubscription = this.walkingRobotService.form.subscribe( form => {      
      // Show the movement form
      this.moveRobotShow = true;
    })    
  }

  ngOnInit(): void {
  }

  // Submit of move robot form
  moveRobotSubmit() {
    let formValues = this.moveRobotForm.value;
    let commands = formValues.robotCommands.toUpperCase();

    this.walkingRobotService.checkMovingRobotCommands(commands).subscribe( response => {
      if (response['success'] === true) {
        this.moveRobot(commands);
      } else {
        this.errorHandling(response['msg']);
      }
    }, 
    err => {
      this.errorHandling(err);
    });
  }

  moveRobot(commands) {
    // Run robot movement
    this.walkingRobotService.moveRobot(commands).subscribe( position => {
      this.position = position;
    },
    err => {
      this.errorHandling(err);    
    });
  }

  errorHandling(error) {
    alert(error);
  }
}
