import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthService} from './services/auth.service';
import {LoginComponent} from './login.component';
import {LoginMaterialModule} from './login-material.module';
import {LoginRoutingModule} from './login-routing.module';
import {LoginService} from './services/login.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    LoginMaterialModule,
    LoginRoutingModule
  ],
  providers: [
    AuthService,
    LoginService
  ]
})
export class LoginModule {
}
