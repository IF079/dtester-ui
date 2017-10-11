import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {defaultLoginUrlConfig} from './config/login-url.default.config';

const loginRoutes = [
  {
    path: defaultLoginUrlConfig.login, /// TODO: injectable loginUrlConfig
    component: LoginComponent
  },
  {
    path: defaultLoginUrlConfig.logout,
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
