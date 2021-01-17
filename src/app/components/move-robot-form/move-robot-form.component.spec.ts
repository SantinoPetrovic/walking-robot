import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveRobotFormComponent } from './move-robot-form.component';

describe('MoveRobotFormComponent', () => {
  let component: MoveRobotFormComponent;
  let fixture: ComponentFixture<MoveRobotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveRobotFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveRobotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
