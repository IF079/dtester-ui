import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {
  mockedForInsert, mockedForPagination,  mockedNumberOfRecordsWithLimit,
  mockedResponse
} from '../../../../../mocks/subject/subject.mock.constants';
import {SubjectService} from './subject.service';
import {url} from '../../shared/constants/url-constants';

describe('Subject Service', () => {
  let httpMock: HttpTestingController;
  let subjectService: SubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [SubjectService]
    });

    subjectService = TestBed.get(SubjectService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', inject([SubjectService], (service: SubjectService) => {
    expect(service).toBeTruthy();
  }));

  it('should return  array of subjects with a given limit and number of records', (done) => {
    // act
    subjectService.getSubjectsRange(mockedForPagination.limit, mockedForPagination.offset).subscribe((res: any) => {
      done();
      // assert
     for (let i = 0; i < mockedForPagination.limit; i++) {
       expect(res[0][i].name).toEqual(mockedResponse.allSubjects[i].subject_name);
     }
      expect(res[1].numberOfRecords).toEqual(mockedNumberOfRecordsWithLimit.numberOfRecords);
    });

    const getSubjectsRange = httpMock.expectOne(`${url.subjectUrl}${url.getRecordsRange}/${mockedForPagination.limit}/${mockedForPagination.offset}`);
    const getSubjectsNumberOfRecords = httpMock.expectOne(`${url.subjectUrl}${url.getCount}`);
    // arrange
    getSubjectsRange.flush(mockedResponse.allSubjects.slice(mockedForPagination.offset, mockedForPagination.limit));
    getSubjectsNumberOfRecords.flush(mockedNumberOfRecordsWithLimit);
  });
  it('should return subject id, subject name and subject description after inserting subject', (done) => {
    // act
    subjectService.addSubject(mockedForInsert).subscribe((res: any) => {
      done();
      // assert
      expect(res[0].subject_id).toEqual(mockedResponse.afterInsert[0].subject_id);
      expect(res[0].subject_name).toEqual(mockedResponse.afterInsert[0].subject_name);
      expect(res[0].subject_description).toEqual(mockedResponse.afterInsert[0].subject_description);
    });

    const addSubjectRequest = httpMock.expectOne(`${url.subjectUrl}${url.insertData}`);
    // arrange
    addSubjectRequest.flush(mockedResponse.afterInsert);
  });
});
