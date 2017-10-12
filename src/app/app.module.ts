import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginModule} from './login/login.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {DomainUrlAppenderInterceptor} from './shared/interceptors/domain-url-appender.interceptor';
import {NavComponent} from './nav/nav.component';
import {AppMaterialModule} from './app-material.module';
import {StudentsComponent} from './students/students.component';
import {BasicErrorHandler} from './shared/basic-error-handler';
import {StudentsDataService} from './shared/services/students-data.service';
import { SpecialityComponent } from './speciality/speciality.component';
import { SpecialityService } from './shared/services/speciality.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavComponent,
    StudentsComponent,
    SpecialityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    LoginModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: DomainUrlAppenderInterceptor, multi: true},
    {provide: ErrorHandler, useClass: BasicErrorHandler},
    StudentsDataService,
    SpecialityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
