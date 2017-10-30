import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgProgressModule, NgProgressInterceptor} from 'ngx-progressbar';

import {MainComponent} from './main.component';
import {MainRoutingModule} from './main-routing.module';
import {NavComponent} from './nav/nav.component';
import {FacultiesComponent} from './faculties/faculties.component';
import {GroupsComponent} from './groups/groups.component';
import {ModalComponent} from './modal/modal.component';
import {PaginationComponent} from './pagination/pagination.component';
import {SpecialityComponent} from './speciality/speciality.component';
import {StudentComponent} from './student/student.component';
import {StudentDetailComponent} from './student-detail/student-detail.component';
import {SubjectComponent} from './subject/subject.component';
import {TimeTableComponent} from './time-table/time-table.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {MainMaterialModule} from './main-material.module';
import {StudentService} from './shared/services/crud/student.service';
import {SpecialityService} from './shared/services/crud/speciality.service';
import {SubjectService} from './shared/services/crud/subject.service';
import {SpinnerService} from './shared/services/spinner.service';
import {GroupsService} from './shared/services/crud/groups.service';
import {SpinnerInterceptor} from './shared/interceptors/spinner.interceptor';
import {EntityTableComponent} from './entity-table/entity-table.component';
import {FacultyService} from './shared/services/crud/faculty.service';
import {TimeTableService} from './shared/services/crud/time-table.service';

@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
    FacultiesComponent,
    GroupsComponent,
    ModalComponent,
    PaginationComponent,
    SpecialityComponent,
    StudentComponent,
    StudentDetailComponent,
    SubjectComponent,
    TimeTableComponent,
    WelcomeComponent,
    EntityTableComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MainMaterialModule,
    HttpClientModule,
    NgProgressModule
  ],
  providers: [
    /*{provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},*/
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    StudentService,
    SpecialityService,
    GroupsService,
    SubjectService,
    FacultyService,
    TimeTableService,
    SpinnerService
  ]
})
export class MainModule {
}
