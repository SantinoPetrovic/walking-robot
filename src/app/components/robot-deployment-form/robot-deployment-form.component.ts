import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { WalkingRobotService } from '../../services/walking-robot.service';

@Component({
  selector: 'app-robot-deployment-form',
  templateUrl: './robot-deployment-form.component.html',
  styleUrls: ['./robot-deployment-form.component.css']
})
export class RobotDeploymentFormComponent implements OnInit {

  robotDeploymentShow: boolean = true;
  directions = [];

  // Deploy robot form
  robotDeploymentForm = this.formBuilder.group({
    sizeWidth: '',
    sizeHeight: '',
    locationWidth: '',
    locationHeight: '',
    directionId: 0
  });

  constructor(
    private formBuilder: FormBuilder,
    private walkingRobotService: WalkingRobotService  
  ) { }

  ngOnInit(): void {
    this.walkingRobotService.getDirections().subscribe( directions => {
      this.directions = directions;
    },
    err => {
      this.errorHandling(err);
    });
  }

  // Submit of Deploy robot form
  deployRobotSubmit() {
    let formValues = this.robotDeploymentForm.value;
      this.walkingRobotService.checkDeployrobotForm(formValues).subscribe( response => {
        if (response['success'] === true) {
          // Finish the form submit if everything is ok and hide the form
          this.walkingRobotService.deployRobot(formValues);
          this.robotDeploymentShow = false;
        } else {
          this.errorHandling(response['msg']);
        }
      },
      err => {
        this.errorHandling(err);
      });
  }

  errorHandling(error) {
    alert(error);
  }
}
