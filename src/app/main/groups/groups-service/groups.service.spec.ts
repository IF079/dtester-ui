import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {
  mockedForInsert, mockedForPagination, mockedNumberOfRecordsAll, mockedNumberOfRecordsWithLimit,
  mockedResponse
} from '../../../../../mocks/groups/groups.mock.constants';
import {GroupsService} from './groups.service';
import {url} from '../../shared/constants/url-constants';

describe('Groups Service', () => {
  let httpMock: HttpTestingController;
  let groupsService: GroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [GroupsService]
    });

    groupsService = TestBed.get(GroupsService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', inject([GroupsService], (service: GroupsService) => {
    expect(service).toBeTruthy();
  }));

  it(`should return  array of  all the groups and number of records for groups`, (done) => {
    // act
    groupsService.getGroups().subscribe((res) => {

      // assert
      for (let i = 0; i < mockedResponse.allGroups.length; i++) {
        expect(res[0][i].group_name).toEqual(mockedResponse.allGroups[i].group_name);
      }
      expect(res[1].numberOfRecords).toEqual(mockedNumberOfRecordsAll.numberOfRecords);
      done();
    });

    const getGroups = httpMock.expectOne(`${url.groupUrl}${url.getRecords}`);
    const getGroupsNumberOfRecords = httpMock.expectOne(`${url.groupUrl}${url.getCount}`);
    // arrange
    getGroups.flush(mockedResponse.allGroups);
    getGroupsNumberOfRecords.flush(mockedNumberOfRecordsAll);
  });

  it(`should return   array of all the faculties and  array of all the specialites`, (done) => {
    // act
    groupsService.getFacultiesAndSpecialities().subscribe((res) => {

      // assert
      for (let i = 0; i < mockedResponse.allFaculties.length; i++) {
        expect(res[0][i].faculty_name).toEqual(mockedResponse.allFaculties[i].faculty_name);
      }
      for (let i = 0; i < mockedResponse.allSpecialities.length; i++) {
        expect(res[1][i].specialityName).toEqual(mockedResponse.allSpecialities[i].speciality_name);
      }
      done();
    });

    const getAllFaculties = httpMock.expectOne(`${url.facultyUrl}${url.getRecords}`);
    const getAllSpecialities = httpMock.expectOne(`${url.specialityUrl}${url.getRecords}`);
    // arrange
    getAllFaculties.flush(mockedResponse.allFaculties);
    getAllSpecialities.flush(mockedResponse.allSpecialities);
  });

  it(`should return  array of groups with a  given limit , array of all the faculties
   and  array of all the specialites  and number of records for groups`, (done) => {
    // act
    groupsService.getGroupsRange(mockedForPagination.limit, mockedForPagination.offset).subscribe((res) => {
      // assert
      for (let i = 0; i < mockedForPagination.limit; i++) {
        expect(res[0][i].group_name).toEqual(mockedResponse.allGroups[i].group_name);
      }
      for (let i = 0; i < mockedResponse.allFaculties.length; i++) {
        expect(res[1][i].faculty_name).toEqual(mockedResponse.allFaculties[i].faculty_name);
      }
      for (let i = 0; i < mockedResponse.allSpecialities.length; i++) {
        expect(res[2][i].specialityName).toEqual(mockedResponse.allSpecialities[i].speciality_name);
      }
      expect(res[3].numberOfRecords).toEqual(mockedNumberOfRecordsWithLimit.numberOfRecords);
      done();
    });

    const getGroupsRange = httpMock.expectOne(
      `${url.groupUrl}${url.getRecordsRange}/${mockedForPagination.limit}/${mockedForPagination.offset}`);
    const getAllFaculties = httpMock.expectOne(`${url.facultyUrl}${url.getRecords}`);
    const getAllSpecialities = httpMock.expectOne(`${url.specialityUrl}${url.getRecords}`);
    const getGroupsNumberOfRecords = httpMock.expectOne(`${url.groupUrl}${url.getCount}`);
    // arrange
    getGroupsRange.flush(mockedResponse.allGroups.slice(mockedForPagination.offset, mockedForPagination.limit));
    getAllFaculties.flush(mockedResponse.allFaculties);
    getAllSpecialities.flush(mockedResponse.allSpecialities);
    getGroupsNumberOfRecords.flush(mockedNumberOfRecordsWithLimit);
  });

  it('should return group id, group name, speciality_id, faculty_id after inserting group', (done) => {
    // act
    groupsService.addGroup(mockedForInsert).subscribe((res: any) => {
      // assert
      expect(res[0].group_id).toEqual(mockedResponse.afterInsert[0].group_id);
      expect(res[0].group_name).toEqual(mockedResponse.afterInsert[0].group_name);
      expect(res[0].speciality_id).toEqual(mockedResponse.afterInsert[0].speciality_id);
      expect(res[0].faculty_id).toEqual(mockedResponse.afterInsert[0].faculty_id);
      done();
    });

    const addGroupsRequest = httpMock.expectOne(`${url.groupUrl}${url.insertData}`);
    // arrange
    addGroupsRequest.flush(mockedResponse.afterInsert);
  });
});
