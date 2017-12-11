import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {
   mockedForPagination, mockedResponse, mockedNumberOfRecords, mockedAddition
} from '../../../../mocks/faculty/faculty.mock.constants';
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

  it ('should return array of faculties and number of records', (done) => {
    // act
    facultyService.getFacultiesRange(mockedForPagination.limit, mockedForPagination.offset).subscribe((res: any) => {
      done();
      // assert
      for (let i = 0; i < mockedForPagination.limit; i++) {
        expect(res[0][i].faculty_name).toEqual(mockedResponse.allFaculties[i].faculty_name);
      }
      expect(res[1].numberOfRecords).toEqual(mockedNumberOfRecords.numberOfRecords);
    });

    const getFacultyRequest = httpMock.expectOne(
      `${url.facultyUrl}${url.getRecordsRange}/${mockedForPagination.limit}/${mockedForPagination.offset}`);
    const getFacultyRecords = httpMock.expectOne(`${url.facultyUrl}${url.getCount}`);
    // arrange
    getFacultyRequest.flush(mockedResponse.allFaculties.slice(mockedForPagination.offset, mockedForPagination.limit));
    getFacultyRecords.flush(mockedNumberOfRecords);
  });

  it ('should create faculty', (done) => {
    // act
    facultyService.addFaculty(mockedAddition).subscribe((res: any) => {
      done();
      expect(res[0].faculty_id).toEqual(mockedResponse.afterAddition[0].faculty_id);
      expect(res[0].faculty_name).toEqual(mockedResponse.afterAddition[0].faculty_name);
      expect(res[0].faculty_description).toEqual(mockedResponse.afterAddition[0].faculty_description);
    });
    const addFacultyRequest = httpMock.expectOne(`${url.facultyUrl}${url.insertData}`);
    // arrange
    addFacultyRequest.flush(mockedResponse.afterAddition);
    });
});
