import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../login/services/login.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private loginService: LoginService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    const Logged = this.loginService.isLoggedIn()
      .map(user => user.isLogged())
      .do((canActivate) => {
        if (canActivate && !this.loginService.user.isAdmin()) {
          this.router.navigate(['/welcome']);
        } else if (!canActivate) {
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        }
      });
    return Logged;
  }
}
