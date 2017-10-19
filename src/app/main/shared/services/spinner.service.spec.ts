import {inject, TestBed} from '@angular/core/testing';

import {SpinnerTasksTrackerService} from './spinner.service';

describe('SpinnerTasksTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerTasksTrackerService]
    });
  });

  it('should be created', inject([SpinnerTasksTrackerService], (service: SpinnerTasksTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
