import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkingRobotContainerComponent } from './walking-robot-container.component';

describe('WalkingRobotContainerComponent', () => {
  let component: WalkingRobotContainerComponent;
  let fixture: ComponentFixture<WalkingRobotContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkingRobotContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkingRobotContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
