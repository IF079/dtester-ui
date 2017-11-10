import {Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {LoginSuccess} from '../entities/login-success';
import {User} from '../entities/user';
import {Authorization} from '../entities/auth';
import {DEFAULT_AUTH_CONFIG} from '../config/auth.default.config';


@Injectable()
export class AuthService {
  private isLoggedInParams: string;
  private loginParams: string;
  private logoutParams: string;

  constructor(private http: HttpClient,
              @Optional() authConfig: Authorization) {
    if (!authConfig) {
      authConfig = DEFAULT_AUTH_CONFIG;
    }
    this.isLoggedInParams = authConfig.isLoggedIn;
    this.loginParams = authConfig.login;
    this.logoutParams = authConfig.logout;
  }

  isLoggedIn(): Observable<User> {
    return this.http.get<LoginSuccess>(this.isLoggedInParams)
      .map(LoginSuccess.toUser);
  }

  login(credentials: string): Observable<User> {
    return this.http.post<LoginSuccess>(this.loginParams, credentials)
      .map(LoginSuccess.toUser);
  }

  logout(): Observable<any> {
    return this.http.get(this.logoutParams);
  }
}
