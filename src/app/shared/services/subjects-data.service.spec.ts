import { TestBed, inject } from '@angular/core/testing';

import { SubjectsDataService } from './subjects-data.service';

describe('SubjectsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubjectsDataService]
    });
  });

  it('should be created', inject([SubjectsDataService], (service: SubjectsDataService) => {
    expect(service).toBeTruthy();
  }));
});
