import {LoginService} from './login.service';
import {inject, TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('Login Service', () => {
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        LoginService,
        AuthService]
    });

    loginService = TestBed.get(LoginService);
  });
  it('should be created', inject([LoginService], (service) => {
    expect(service).toBeTruthy();
  }));
  it('should setup User', () => {
    expect(loginService.username('user')).toBeTruthy();
  });
  it('should check if User logged in', () => {
    expect(loginService.isLoggedIn()).toBeTruthy();
  });
});
