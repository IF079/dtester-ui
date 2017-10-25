import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from '../services/login.service';

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
