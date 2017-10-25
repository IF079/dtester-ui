import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {DEFAULT_LOGIN_URL_CONFIG} from './services/config/login-url.default.config';

const loginRoutes = [
  {
    path: DEFAULT_LOGIN_URL_CONFIG.login,
    component: LoginComponent
  },
  {
    path: DEFAULT_LOGIN_URL_CONFIG.logout,
    component: LogoutComponent
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
