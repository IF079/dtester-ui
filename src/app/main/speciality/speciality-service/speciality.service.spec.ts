import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {SpecialityService} from './speciality.service';
import {url} from '../../shared/constants/url-constants';

describe('SpecialityService', () => {
  let httpMock: HttpTestingController;
  let specialityService: SpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [SpecialityService]
    });

    specialityService = TestBed.get(SpecialityService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([SpecialityService], (service: SpecialityService) => {
    expect(service).toBeTruthy();
  }));

  it('should return group', (done) => {
    specialityService.getSpeciality(1, 0).subscribe((res: any) => {
      done();
      expect(res[0][0].specialityName).toEqual('Конструювання');
      expect(res[1].numberOfRecords).toEqual(1);
    });

    const getSpecialityRequest = httpMock.expectOne(`${url.specialityUrl}${url.getRecordsRange}/1/0`);
    const getSpecialityRecords = httpMock.expectOne(`${url.specialityUrl}${url.getCount}`);
    getSpecialityRequest.flush([{
      speciality_code: '1.1233212',
      speciality_name: 'Конструювання'
    }]);
    getSpecialityRecords.flush({numberOfRecords: 1});
    httpMock.verify();
  });
});
