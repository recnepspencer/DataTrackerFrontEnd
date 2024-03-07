import { TestBed } from '@angular/core/testing';

import { AiCaloriesService } from './ai-calories.service';

describe('AiCaloriesService', () => {
  let service: AiCaloriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiCaloriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
