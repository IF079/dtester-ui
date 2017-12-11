import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {LoginService} from '../login/services/login.service';

@Injectable()
export class StudentGuard implements CanActivate {
  constructor(private loginService: LoginService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    const Logged = this.loginService.isLoggedIn()
      .map(user => user.isStudent())
      .do((canActivate) => {
         if (!canActivate) {
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        }
      });
    return Logged;
  }
}
