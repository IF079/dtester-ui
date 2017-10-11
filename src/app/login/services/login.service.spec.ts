import {TestBed} from '@angular/core/testing';

import {LoginService} from './login.service';
import {LoginModule} from '../login.module';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';
import {User} from './entities/user';
import {AuthService} from './auth.service';

describe('LoginService', () => {
  let service: LoginService;

  const user: User = new User('1', 'user', ['logged', 'user']);

  class AuthServiceSpy {
    isLoggedIn = jasmine.createSpy('isLoggedIn').and.callFake(
      () => Observable.of(user)
    );
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [LoginModule, RouterTestingModule],
      providers: [LoginService, {provide: AuthService, useClass: AuthServiceSpy}]
    });
  });
  beforeEach(() => {
    service = TestBed.get(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user', () => {
    expect(service.user).toEqual(user);
  });
});
