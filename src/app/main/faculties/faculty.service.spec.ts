import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {FacultyService} from './faculty.service';
import {url} from '../shared/constants/url-constants';

describe( 'FacultyService', () => {
  let httpMock: HttpTestingController;
  let facultyService: FacultyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [FacultyService]
    });

    facultyService = TestBed.get(FacultyService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([FacultyService], (service: FacultyService) => {
    expect(service).toBeTruthy();
  }));

  it ('should return faculty and number of records', (done => {
    facultyService.getFacultiesRange(1, 0).subscribe((res: any) => {
      done();
      expect(res[0][0].faculty_name).toEqual('Факультет тестов');
      expect(res[1].numberOfRecords).toEqual(1);
    });
    const getFacultyRequest = httpMock.expectOne(`${url.facultyUrl}${url.getRecordsRange}/1/0`);
    const getFacultyRecords = httpMock.expectOne(`${url.facultyUrl}${url.getCount}`);
    getFacultyRequest.flush([{
      faculty_name: 'Факультет тестов',
      faculty_description: 'Опис'
    }]);
    getFacultyRecords.flush({numberOfRecords: 1});
  }));

});
