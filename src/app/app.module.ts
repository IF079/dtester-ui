import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WelcomeComponent} from './main/welcome/welcome.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginModule} from './login/login.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {DomainUrlAppenderInterceptor} from './shared/interceptors/domain-url-appender.interceptor';
import {NavComponent} from './main/nav/nav.component';
import {AppMaterialModule} from './app-material.module';
import {StudentComponent} from './main/student/student.component';
import {BasicErrorHandler} from './shared/basic-error-handler';
import {FacultiesComponent} from './main/faculties/faculties.component';


import {SpecialityComponent} from './main/speciality/speciality.component';
import {SpecialityService} from './shared/services/speciality.service';

import {SubjectComponent} from './main/subject/subject.component';
import {SubjectService} from './shared/services/subject.service';
import {StudentService} from './shared/services/student.service';
import {StudentDetailComponent} from './main/student-detail/student-detail.component';
import {ModalComponent} from './main/modal/modal.component';
import { PaginationComponent } from './main/pagination/pagination.component';
import {TimeTableComponent} from './main/time-table/time-table.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavComponent,
    StudentComponent,
    FacultiesComponent,
    SpecialityComponent,
    SubjectComponent,
    StudentDetailComponent,
    ModalComponent,
    PaginationComponent,
    TimeTableComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
