import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {SubjectService} from './subject.service';
import {url} from '../../shared/constants/url-constants';

describe('SubjectService', () => {
  let httpMock: HttpTestingController;
  let subjectService: SubjectService;
  const recordsCountResponse = {
    numberOfRecords: 3
  };
  const subjectResponseAfterInsert = [
    {
      subject_id: 4,
      subject_name: 'Subject 4',
      subject_description: 'Subject 4 description'
    }
  ];
  const subjectsResponse = [
    {
      subject_id: 1,
      subject_name: 'Subject 1',
      subject_description: 'Subject description 1'
    },
    {
      groups_id: 2,
      subject_name: 'Subject 2',
      subject_description: 'Subject description 2'
    },
    {
      groups_id: 3,
      subject_name: 'Subject 3',
      subject_description: 'Subject description 3'
    }
  ];
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

  it('should return array of subjects and number of records', (done) => {
    subjectService.getSubjectsRange(3, 0).subscribe((res: any) => {
      done();
      expect(res[0][0].name).toEqual('Subject 1');
      expect(res[0][1].name).toEqual('Subject 2');
      expect(res[0][2].name).toEqual('Subject 3');
      expect(res[1].numberOfRecords).toEqual(3);
    });

    const getSubjectsRequest = httpMock.expectOne(`${url.subjectUrl}${url.getRecordsRange}/3/0`);
    const getSubjectsNumberOfRecords = httpMock.expectOne(`${url.subjectUrl}${url.getCount}`);
    getSubjectsRequest.flush(subjectsResponse);
    getSubjectsNumberOfRecords.flush(recordsCountResponse);
  });
  it('should return subject id, subject name and subject description after inserting subject', (done) => {
    const subject_name = 'Subject 4';
    const subject_description = 'Subject 4 description';
    subjectService.addSubject({subject_name, subject_description }).subscribe((res: any) => {
      done();
      expect(res[0].subject_id).toEqual(4);
      expect(res[0].subject_name).toEqual('Subject 4');
      expect(res[0].subject_description).toEqual('Subject 4 description');
    });

    const addSubjectRequest = httpMock.expectOne(`${url.subjectUrl}${url.insertData}`);
    addSubjectRequest.flush(subjectResponseAfterInsert);
  });
});
