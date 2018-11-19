import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {
  mockedForInsert, mockedForPagination, mockedNumberOfRecordsWithLimit,
  mockedResponse
} from '../../../../../mocks/timetable/timetable.mock.constants';
import {TimeTableService} from './time-table.service';
import {url} from '../../shared/constants/url-constants';

describe('TimeTable Service', () => {
  let httpMock: HttpTestingController;
  let timeTableService: TimeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [TimeTableService]
    });

    timeTableService = TestBed.get(TimeTableService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', inject([TimeTableService], (service: TimeTableService) => {
    expect(service).toBeTruthy();
  }));


  it(`should return   array of all the groups and  array of all the subjects`, (done) => {
    // act
    timeTableService.getGroupsAndSubjects().subscribe((res) => {

      // assert
      for (let i = 0; i < mockedResponse.allGroups.length; i++) {
        expect(res[0][i].group_name).toEqual(mockedResponse.allGroups[i].group_name);
      }
      for (let i = 0; i < mockedResponse.allSubjects.length; i++) {
        expect(res[1][i].name).toEqual(mockedResponse.allSubjects[i].subject_name);
      }
      done();
    });

    const getAllGroups = httpMock.expectOne(`${url.groupUrl}${url.getRecords}`);
    const getAllSubjects = httpMock.expectOne(`${url.subjectUrl}${url.getRecords}`);
    // arrange
    getAllGroups.flush(mockedResponse.allGroups);
    getAllSubjects.flush(mockedResponse.allSubjects);
  });

  it(`should return  array of timetables with a  given limit , array of all the groups
   and  array of all the subjects  and number of records for timetables`, (done) => {
    // act
    timeTableService.getTimeTablesRange(mockedForPagination.limit, mockedForPagination.offset).subscribe((res) => {

      // assert
      for (let i = 0; i < mockedForPagination.limit; i++) {
        expect(res[0][i].start_time).toEqual(mockedResponse.allTimeTables[i].start_time);
      }
      for (let i = 0; i < mockedResponse.allGroups.length; i++) {
        expect(res[1][i].group_name).toEqual(mockedResponse.allGroups[i].group_name);
      }
      for (let i = 0; i < mockedResponse.allSubjects.length; i++) {
        expect(res[2][i].name).toEqual(mockedResponse.allSubjects[i].subject_name);
      }
      expect(res[3].numberOfRecords).toEqual(mockedNumberOfRecordsWithLimit.numberOfRecords);
      done();
    });

    const getTimeTablesRange = httpMock.expectOne(
      `${url.timeTableUrl}${url.getRecordsRange}/${mockedForPagination.limit}/${mockedForPagination.offset}`);
    const getAllGroups = httpMock.expectOne(`${url.groupUrl}${url.getRecords}`);
    const getAllSubjects = httpMock.expectOne(`${url.subjectUrl}${url.getRecords}`);
    const getGroupsNumberOfRecords = httpMock.expectOne(`${url.timeTableUrl}${url.getCount}`);
    // arrange
    getTimeTablesRange.flush(mockedResponse.allTimeTables.slice(mockedForPagination.offset, mockedForPagination.limit));
    getAllGroups.flush(mockedResponse.allGroups);
    getAllSubjects.flush(mockedResponse.allSubjects);
    getGroupsNumberOfRecords.flush(mockedNumberOfRecordsWithLimit);
  });

  it(`should return timetable id, group id, subject id,
  start date, start time, end date, end time after inserting group`, (done) => {
    // act
    timeTableService.addTimeTable(mockedForInsert).subscribe((res: any) => {
      // assert
      expect(res[0].timetable_id).toEqual(mockedResponse.afterInsert[0].timetable_id);
      expect(res[0].group_id).toEqual(mockedResponse.afterInsert[0].group_id);
      expect(res[0].subject_id).toEqual(mockedResponse.afterInsert[0].subject_id);
      expect(res[0].start_date).toEqual(mockedResponse.afterInsert[0].start_date);
      expect(res[0].start_time).toEqual(mockedResponse.afterInsert[0].start_time);
      expect(res[0].end_date).toEqual(mockedResponse.afterInsert[0].end_date);
      expect(res[0].end_time).toEqual(mockedResponse.afterInsert[0].end_time);
      done();
    });

    const addGroupsRequest = httpMock.expectOne(`${url.timeTableUrl}${url.insertData}`);
    // arrange
    addGroupsRequest.flush(mockedResponse.afterInsert);
  });
});
