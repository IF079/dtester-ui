import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {url} from '../../main/shared/constants/url-constants';
import {DEFAULT_AUTH_CONFIG} from '../config/auth.default.config';
import {User} from '../entities/user';

describe('Authorization service', () => {
  let httpMock: HttpTestingController;
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    auth = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([AuthService], (service) => {
    expect(service).toBeTruthy();
  }));

  it('should check if user is logged in', (done) => {
    // Act
    auth.isLoggedIn().subscribe((res: any) => {
      done();
      // Assert
      expect(res.login).toEqual('muron');
      expect(res.roles[0]).toEqual('username');
      expect(res.roles[1]).toEqual('student');
    });
    const getLoggedInResponse = httpMock.expectOne(`${DEFAULT_AUTH_CONFIG.isLoggedIn}`);

    // Arrange
    getLoggedInResponse.flush({
      response: 'logged',
      id: '1',
      login: 'muron',
      roles: ['username', 'student']
    });
    httpMock.verify();
  });
  it('should send request to login', (done) => {
    // Act
    auth.username(this.credentials).subscribe((res: any) => {
      done();
      // Assert
      expect(res.login).toEqual('muron');
      expect(res.roles[0]).toEqual('username');
      expect(res.roles[1]).toEqual('student');
    });
    const getLoginResponse = httpMock.expectOne(`${DEFAULT_AUTH_CONFIG.username}`);
    // Arrange
    getLoginResponse.flush({
      response: 'ok',
      id: '1',
      login: 'muron',
      roles: ['username', 'student']
    });
  });
  it('should logout user', (done) => {
    // Act
    auth.logout().subscribe((res: any) => {
      done();
      // Assert
      expect(res.response).toEqual('user has been logout');
    });
    const getLogoutResponse = httpMock.expectOne(`${DEFAULT_AUTH_CONFIG.logout}`);
    // Arrange
    getLogoutResponse.flush({
    response: 'user has been logout'
    });
  });
});
