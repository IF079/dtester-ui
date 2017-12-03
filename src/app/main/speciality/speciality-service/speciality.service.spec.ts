import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {SpecialityService} from './speciality.service';
import {url} from '../../shared/constants/url-constants';

describe('SpecialityService', () => {
  let httpMock: HttpTestingController;
  let specialityService: SpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpecialityService]
    });

    specialityService = TestBed.get(SpecialityService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([SpecialityService], (service: SpecialityService) => {
    expect(service).toBeTruthy();
  }));

  it('should return speciality', (done) => {
    // Act
    specialityService.getSpeciality(1, 0).subscribe((res: any) => {
      done();
      // Assert
      expect(res[0][0].specialityCode).toEqual('1.1233212');
      expect(res[0][0].specialityName).toEqual('Конструювання');
      expect(res[1].numberOfRecords).toEqual(1);
    });
    const getSpecialityRequest = httpMock.expectOne(`${url.specialityUrl}${url.getRecordsRange}/1/0`);
    const getSpecialityRecords = httpMock.expectOne(`${url.specialityUrl}${url.getCount}`);

    // Arrange
    getSpecialityRequest.flush([{
      speciality_code: '1.1233212',
      speciality_name: 'Конструювання'
    }]);
    getSpecialityRecords.flush({numberOfRecords: 1});
    httpMock.verify();
  });

  it('should add speciality', (done) => {
    // Act
    specialityService.addSpeciality({specialityCode: '6.1233212', specialityName: 'Землевпорядкування'}).
    subscribe((res: any) => {
      done();
      // Assert
      expect(res.speciality_code).toEqual('6.1233212');
      expect(res.speciality_name).toEqual('Землевпорядкування');
    });
    const addSpecialityRequest = httpMock.expectOne(`${url.specialityUrl}${url.insertData}`);
    // Arrange
    addSpecialityRequest.flush({
      speciality_code: '6.1233212',
      speciality_name: 'Землевпорядкування'
    });
    httpMock.verify();
  });
});
