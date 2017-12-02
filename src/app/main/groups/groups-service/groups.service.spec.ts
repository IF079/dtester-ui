import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {
  mockedForInsert, mockedForPagination, mockedNumberOfRecords,
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

  it('should return array of   groups, faculties and specialites  and number of records', (done) => {
    groupsService.getGroupsRange(mockedForPagination.limit, mockedForPagination.offset).subscribe((res) => {
      done();
      expect(res[0][0].group_name).toBe(mockedResponse.allGroups[0].group_name);
      expect(res[0][1].group_name).toBe(mockedResponse.allGroups[1].group_name);
      expect(res[0][2].group_name).toBe(mockedResponse.allGroups[2].group_name);

      expect(res[1][0].faculty_name).toEqual(mockedResponse.allFaculties[0].faculty_name);
      expect(res[1][1].faculty_name).toEqual(mockedResponse.allFaculties[1].faculty_name);
      expect(res[1][2].faculty_name).toEqual(mockedResponse.allFaculties[2].faculty_name);
      expect(res[1][3].faculty_name).toEqual(mockedResponse.allFaculties[3].faculty_name);
      expect(res[1][4].faculty_name).toEqual(mockedResponse.allFaculties[4].faculty_name);

      expect(res[2][0].specialityName).toEqual(mockedResponse.allSpecialities[0].speciality_name);
      expect(res[2][1].specialityName).toEqual(mockedResponse.allSpecialities[1].speciality_name);
      expect(res[2][2].specialityName).toEqual(mockedResponse.allSpecialities[2].speciality_name);
      expect(res[2][3].specialityName).toEqual(mockedResponse.allSpecialities[3].speciality_name);
      expect(res[2][4].specialityName).toEqual(mockedResponse.allSpecialities[4].speciality_name);
      expect(res[3].numberOfRecords).toEqual(mockedNumberOfRecords.numberOfRecords);
    });

    const getGroupsRange = httpMock.expectOne(`${url.groupUrl}${url.getRecordsRange}/${mockedForPagination.limit}/${mockedForPagination.offset}`);
    const getAllFaculties = httpMock.expectOne(`${url.facultyUrl}${url.getRecords}`);
    const getAllSpecialities = httpMock.expectOne(`${url.specialityUrl}${url.getRecords}`);
    const getGroupsNumberOfRecords = httpMock.expectOne(`${url.groupUrl}${url.getCount}`);

    getGroupsRange.flush(mockedResponse.allGroups.slice(mockedForPagination.offset, mockedForPagination.limit));
    getAllFaculties.flush(mockedResponse.allFaculties);
    getAllSpecialities.flush(mockedResponse.allSpecialities);
    getGroupsNumberOfRecords.flush(mockedNumberOfRecords);
  });
  it('should return group id, group name, speciality_id, faculty_id after inserting group', (done) => {

    groupsService.addGroup(mockedForInsert).subscribe((res: any) => {
      done();
      expect(res[0].group_id).toEqual(mockedResponse.afterInsert[0].group_id);
      expect(res[0].group_name).toEqual(mockedResponse.afterInsert[0].group_name);
      expect(res[0].speciality_id).toEqual(mockedResponse.afterInsert[0].speciality_id);
      expect(res[0].faculty_id).toEqual(mockedResponse.afterInsert[0].faculty_id);
    });

    const addGroupsRequest = httpMock.expectOne(`${url.groupUrl}${url.insertData}`);
    addGroupsRequest.flush(mockedResponse.afterInsert);
  });
});
