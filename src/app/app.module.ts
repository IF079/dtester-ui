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
import {StudentComponent} from './student/student.component';
import {BasicErrorHandler} from './shared/basic-error-handler';
import {FacultiesComponent} from './faculties/faculties.component';
import {HttpClientService} from './shared/services/http-client.service';

import { SpecialityComponent } from './speciality/speciality.component';
import { SpecialityService } from './shared/services/speciality.service';

import { SubjectComponent } from './subject/subject.component';
import {SubjectService} from './shared/services/subject.service';
import {StudentService} from './shared/services/student.service';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavComponent,
    StudentComponent,
    FacultiesComponent,
    SpecialityComponent,
    SubjectComponent
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
    StudentService,
    SpecialityService,
    SubjectService,
    HttpClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
