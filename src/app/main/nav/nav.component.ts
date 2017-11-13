import {Component} from '@angular/core';

import {LoginService} from '../../login/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  navActiveClass = 'mat-accent';
  constructor(public loginService: LoginService) {
  }
}
