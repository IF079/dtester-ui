import {SpinnerService} from './spinner.service';
import {inject, TestBed} from '@angular/core/testing';

describe('SpinnerService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService]
    });
  });

  it('should be created', inject([SpinnerService], (service: SpinnerService) => {
    expect(service).toBeTruthy();
  }));

  /*it ('spinner should be hidden by default', () => {
    expect(SpinnerService.taskcounter).toEqual(0);
  });*/
});
