import { TestBed, inject } from '@angular/core/testing';

import { BasicEntityGridService } from './basic-entity-grid.service';

describe('BasicEntityGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicEntityGridService]
    });
  });

  it('should be created', inject([BasicEntityGridService], (service: BasicEntityGridService) => {
    expect(service).toBeTruthy();
  }));
});
