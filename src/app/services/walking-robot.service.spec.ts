import { TestBed } from '@angular/core/testing';

import { WalkingRobotService } from './walking-robot.service';

describe('WalkingRobotService', () => {
  let service: WalkingRobotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalkingRobotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
