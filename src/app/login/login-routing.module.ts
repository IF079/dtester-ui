import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {LoginComponent} from './login.component';
import {DEFAULT_LOGIN_URL_CONFIG} from './config/login-url.default.config';

const loginRoutes = [
  {
    path: DEFAULT_LOGIN_URL_CONFIG.username,
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {
}
