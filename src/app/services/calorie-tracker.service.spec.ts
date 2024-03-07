import { TestBed } from '@angular/core/testing';

import { CalorieTrackerService } from './calorie-tracker.service';

describe('CalorieTrackerService', () => {
  let service: CalorieTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalorieTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
