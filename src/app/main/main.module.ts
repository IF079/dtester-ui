import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {MainComponent} from './main.component';
import {MainRoutingModule} from './main-routing.module';
import {NavComponent} from './nav/nav.component';
import {FacultiesComponent} from './faculties/faculties.component';
import {GroupsComponent} from './groups/groups.component';
import {ModalComponent} from './modal/modal.component';
import {SpecialityComponent} from './speciality/speciality.component';
import {StudentComponent} from './student/student.component';
import {StudentDetailComponent} from './student-detail/student-detail.component';
import {SubjectComponent} from './subject/subject.component';
import {SubjectModalComponent} from './subject-modal/subject-modal.component';
import {TimeTableComponent} from './time-table/time-table.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {MainMaterialModule} from './main-material.module';
import {StudentService} from './student/student.service';
import {SpecialityService} from './speciality/speciality.service';
import {SubjectService} from './subject/subject.service';
import {SpinnerService} from './spinner/spinner.service';
import {GroupsService} from './groups/groups.service';
import {SpinnerInterceptor} from './spinner/spinner.interceptor';
import {EntityTableComponent} from './entity-table/entity-table.component';
import {FacultyService} from './faculties/faculty.service';
import {TimeTableService} from './time-table/time-table.service';
import {StudentAddModalComponent} from './student/add-modal/add-modal.component';
import {TestComponent} from './test/test.component';
import {TestDetailComponent} from './test-detail/test-detail.component';
import {TestService} from './test/test.service';
import {TestDetailService} from './test-detail/test-detail.service';

@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
    FacultiesComponent,
    GroupsComponent,
    ModalComponent,
    SpecialityComponent,
    StudentComponent,
    StudentDetailComponent,
    SubjectComponent,
    SubjectModalComponent,
    TimeTableComponent,
    WelcomeComponent,
    EntityTableComponent,
    StudentAddModalComponent,
    TestComponent,
    TestDetailComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MainMaterialModule
  ],
  entryComponents: [
    SubjectModalComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
    StudentService,
    SpecialityService,
    GroupsService,
    SubjectService,
    FacultyService,
    TimeTableService,
    TestService,
    TestDetailService,
    SpinnerService
  ]
})
export class MainModule {
}
