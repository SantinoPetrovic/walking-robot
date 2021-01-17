import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'  
import { ReactiveFormsModule} from '@angular/forms' 
import { NgModule } from '@angular/core';

// Services
import { WalkingRobotService } from './services/walking-robot.service';

// Components
import { AppComponent } from './app.component';
import { WalkingRobotContainerComponent } from './components/walking-robot-container/walking-robot-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RobotDeploymentFormComponent } from './components/robot-deployment-form/robot-deployment-form.component';
import { MoveRobotFormComponent } from './components/move-robot-form/move-robot-form.component';

@NgModule({
  declarations: [
    AppComponent,
    WalkingRobotContainerComponent,
    RobotDeploymentFormComponent,
    MoveRobotFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule    
  ],
  providers: [
    WalkingRobotService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
