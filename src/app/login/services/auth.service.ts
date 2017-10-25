import {Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';


import {LoginSuccess} from './entities/login-success';
import {User} from './entities/user';
import {Credentials} from './entities/credentials';
import {AuthConfig} from '../config/auth.config';
import {defaultAuthConfig} from '../config/auth.default.config';
import {RequestParams} from './params/request-params';

@Injectable()

export class AuthService {
  private isLoggedInParams: RequestParams;
  private loginParams: RequestParams;
  private logoutParams: RequestParams;
  constructor(private http: HttpClient,
              @Optional() authConfig: AuthConfig) {
    if (!authConfig) {
      authConfig = defaultAuthConfig;
    }
    this.isLoggedInParams = authConfig.isLoggedIn;
    this.loginParams = authConfig.login;
    this.logoutParams = authConfig.logout;
  }

  static loginSuccess(ls: LoginSuccess): User {
    if (ls.response === 'logged' || ls.response === 'ok') {
      return new User(ls.id, ls.username, ls.roles);
    }
    return new User();
  }

  isLoggedIn(): Observable<User> {
    return this.http.get<LoginSuccess>(this.isLoggedInParams.uri)
      .map(AuthService.loginSuccess)
      .timeout(this.isLoggedInParams.timeout);
  }

  login(credentials: Credentials): Observable<User> {
    return this.http.post<LoginSuccess>(this.loginParams.uri, credentials)
      .map(AuthService.loginSuccess)
      .timeout(this.loginParams.timeout);
  }

  logout(): Observable<any> {
    return this.http.get(this.logoutParams.uri)
      .timeout(this.logoutParams.timeout);
  }

}
