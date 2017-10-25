import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styles: [],
})
export class LogoutComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.loginService.logout().subscribe(
      (hasBeenLoggedOut) => {
        if (hasBeenLoggedOut) {
          this.router.navigate(['']);
        }
      },
      () => {
      },
      () => {
      }
    );
  }
}
