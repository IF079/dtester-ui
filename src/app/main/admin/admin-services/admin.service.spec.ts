
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {
  mockedForCheckFunctionality,
  mockedForInsert, mockedForPagination, mockedNumberOfRecordsWithLimit,
  mockedResponse
} from '../../../../../mocks/admin/admin.mock.constants';

import {url} from '../../shared/constants/url-constants';
import {AdminService} from './admin.service';

describe('Admin Service', () => {
  let httpMock: HttpTestingController;
  let adminService: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [AdminService]
    });

    adminService = TestBed.get(AdminService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', inject([AdminService], (service: AdminService) => {
    expect(service).toBeTruthy();
  }));

  it('should return limited array of  admins with a  given limit and number of records', (done) => {
    // act
    adminService.getAdminsRange(mockedForPagination.limit, mockedForPagination.offset).subscribe((res: any) => {
      // assert
      for (let i = 0; i < mockedForPagination.limit; i++) {
        expect(res[0][i].username).toEqual(mockedResponse.allAdmins[i].username);
      }
      expect(res[1].numberOfRecords).toEqual(mockedNumberOfRecordsWithLimit.numberOfRecords);
      done();
    });

    const getAdminsRange = httpMock.expectOne(`${url.adminUser}${url.getRecordsRange}/${mockedForPagination.limit}/${mockedForPagination.offset}`);
    const getAdminsNumberOfRecords = httpMock.expectOne(`${url.adminUser}${url.getCount}`);
    // arrange
    getAdminsRange.flush(mockedResponse.allAdmins.slice(mockedForPagination.offset, mockedForPagination.limit));
    getAdminsNumberOfRecords.flush(mockedNumberOfRecordsWithLimit);
  });
  it('should return email, id and username after inserting admin', (done) => {
    // act
    adminService.addAdmin(mockedForInsert).subscribe((res: any) => {
      // assert
      expect(res.email).toEqual(mockedResponse.afterInsert.email);
      expect(res.id).toEqual(mockedResponse.afterInsert.id);
      expect(res.username).toEqual(mockedResponse.afterInsert.username);
      done();
    });
    const addAdminRequest = httpMock.expectOne(`${url.adminUser}${url.insertData}`);
    // arrange
    addAdminRequest.flush(mockedResponse.afterInsert);
  });

  it('should return boolean response is username already used, or not', (done) => {
    // act
    adminService.checkUserName(mockedForCheckFunctionality.username).subscribe(response => {
      // assert
      expect(typeof response.response).toBe('boolean');
      done();
    });

    const checkUserNameRequest = httpMock.expectOne(`${url.adminUser}${url.checkUserName}/${mockedForCheckFunctionality.username}`);
    // arrange
    checkUserNameRequest.flush(mockedResponse.checkUsername);
  });

  it('should return boolean response is email already used, or not', (done) => {
    adminService.checkEmailAddress(mockedForCheckFunctionality.email).subscribe(response => {
      // assert
      expect(response.response).toBe('boolean');
      done();
    });
    const checkEmailRequest = httpMock.expectOne(`${url.adminUser}${url.checkEmailAddress}/${mockedForCheckFunctionality.email}`);
    // arrange
    checkEmailRequest.flush(mockedResponse.checkEmail);
  });
});
