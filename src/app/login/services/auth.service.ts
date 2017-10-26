import {Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';

import {LoginSuccess} from './entities/login-success';
import {User} from './entities/user';
import {Credentials} from './entities/credentials';
import {RequestParams} from './params/request-params';
import {AuthConfig} from './config/auth.config';
import {DEFAULT_AUTH_CONFIG} from './config/auth.default.config';


@Injectable()
export class AuthService {
  private isLoggedInParams: RequestParams;
  private loginParams: RequestParams;
  private logoutParams: RequestParams;

  constructor(private http: HttpClient,
              @Optional() authConfig: AuthConfig) {
    if (!authConfig) {
      authConfig = DEFAULT_AUTH_CONFIG;
    }
    this.isLoggedInParams = authConfig.isLoggedIn;
    this.loginParams = authConfig.login;
    this.logoutParams = authConfig.logout;
  }

  isLoggedIn(): Observable<User> {
    return this.http.get<LoginSuccess>(this.isLoggedInParams.uri)
      .map(LoginSuccess.toUser)
      .timeout(this.isLoggedInParams.timeout);
  }

  login(credentials: Credentials): Observable<User> {
    return this.http.post<LoginSuccess>(this.loginParams.uri, credentials)
      .map(LoginSuccess.toUser)
      .timeout(this.loginParams.timeout);
  }

  logout(): Observable<any> {
    return this.http.get(this.logoutParams.uri)
      .timeout(this.logoutParams.timeout);
  }
}
