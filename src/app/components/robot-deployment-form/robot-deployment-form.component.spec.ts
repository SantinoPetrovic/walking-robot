import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotDeploymentFormComponent } from './robot-deployment-form.component';

describe('RobotDeploymentFormComponent', () => {
  let component: RobotDeploymentFormComponent;
  let fixture: ComponentFixture<RobotDeploymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobotDeploymentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotDeploymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
