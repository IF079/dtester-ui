import {Injectable, Optional} from '@angular/core';
import {Credentials} from './entities/credentials';
import {User} from './entities/user';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publish';
import {ConnectableObservable} from 'rxjs/Rx';
import {UrlUtils} from '../utils/url-utils';
import {LoginUrlConfig} from '../config/login-url.config';
import {defaultLoginUrlConfig} from '../config/login-url.default.config';

@Injectable()
export class LoginService {

  public user: User = new User();

  public redirectAfterLogin: string = null;

  private isLoggedInConnectable: ConnectableObservable<User> = null;
  private logoutInConnectable: ConnectableObservable<User> = null;

  private initialized = false;

  constructor(private auth: AuthService, private router: Router,
              @Optional() private urlConfig: LoginUrlConfig) {
    if (!urlConfig) {
      this.urlConfig = defaultLoginUrlConfig;
    }
    this.initialize();
  }

  isLoggedIn(): Observable<User> {
    if (this.user.isLogged() || this.initialized) {
      return Observable.of(this.user);
    }
    return this.isLoggedInConnectable || this.establishHotConnectionForIsLoggedIn();
  }

  login(credentials: Credentials): Observable<User> {
    return this.auth.login(credentials)
      .do(user => {
        return this.setupUser(user);
      })
      .do(() => this.router.navigate([this.getRedirectionUrl()]));
  }

  logout(): Observable<User> {
    return this.logoutInConnectable || this.establishHotConnectionForIsLogout();
  }

  private initialize() {
    this.isLoggedIn()
      .finally(() => this.initialized = true)
      .subscribe();

  }

  private getRedirectionUrl(): string {
    return UrlUtils.trimRedirectionUrl(
      UrlUtils.adornRedirectionUrl(this.redirectAfterLogin),
      [this.urlConfig.login, this.urlConfig.logout], '/');
  }

  private establishHotConnectionForIsLoggedIn(): ConnectableObservable<User> {
    const obs = this.auth.isLoggedIn()
      .do(user => this.setupUser(user))
      .finally(() => this.isLoggedInConnectable = null)
      .publish();
    this.isLoggedInConnectable = obs;
    obs.connect();
    return obs;
  }

  private establishHotConnectionForIsLogout(): ConnectableObservable<User> {
    this.logoutInConnectable = this.auth.logout()
      .map((response) => this.dropUser())
      .finally(() => this.logoutInConnectable = null)
      .publish();
    this.logoutInConnectable.connect();
    return this.logoutInConnectable;
  }

  private setupUser(user: User): User {
    if (user) {
      this.user.id = user.id;
      this.user.username = user.username;
      this.user.roles = user.roles;
    }
    return user;
  }

  private dropUser(): User {
    const droppedUser = this.user.clone();
    const emptyUser = new User();
    this.user.id = emptyUser.id;
    this.user.username = emptyUser.username;
    this.user.roles = emptyUser.roles;
    return droppedUser;
  }

}
