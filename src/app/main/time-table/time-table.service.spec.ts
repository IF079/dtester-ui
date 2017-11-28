import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {TimeTableService} from './time-table.service';
import {url} from '../shared/constants/url-constants';

describe('TimeTableService', () => {
  let httpMock: HttpTestingController;
  let timetableService: TimeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [TimeTableService]
    });

    timetableService = TestBed.get(TimeTableService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([TimeTableService], (service: TimeTableService) => {
    expect(service).toBeTruthy();
  }));

  it('should return group', (done) => {
    timetableService.getTimeTablesRange(1 , 0).subscribe((res: any) => {
      done();
      expect(res[0][0].end_date).toEqual('2017-11-11');
      expect(res[1].numberOfRecords).toEqual(1);
      expect(res[2].group_id).toEqual(1);
      expect(res[3].subject_id).toEqual(1);
      });

    const getTimeTableRequest = httpMock.expectOne(`${url.timeTableUrl}${url.getRecordsRange}/1/0`);
    const getTimeTableRecords = httpMock.expectOne(`${url.timeTableUrl}${url.getCount}`);
    const getGroupRequest = httpMock.expectOne(`${url.groupUrl}${url.getRecords}`);
    const getSubjectRequest = httpMock.expectOne(`${url.subjectUrl}${url.getRecords}`);

    getTimeTableRequest.flush([{
      start_date: '2017-11-11',
      end_date: '2017-11-11'
    }]);

    getTimeTableRecords.flush({numberOfRecords: 1});
    httpMock.verify();

    getGroupRequest.flush({
      group_id: 1
    });

    getSubjectRequest.flush({
      subject_id: 1
    });
  });
});
