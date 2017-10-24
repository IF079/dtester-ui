import {NgModule} from '@angular/core';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {LogoutComponent} from './logout/logout.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LoginService} from './services/login.service';
import {LoginMaterialModule} from './login-material.module';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    LoginRoutingModule,
    LoginMaterialModule
  ],
  providers: [
    AuthService,
    LoginService
  ]
})
export class LoginModule {
}
