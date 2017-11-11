import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DeleteConfirmModalComponent} from './entity-table/delete-confirm-modal/delete-confirm-modal.component';
import {EditEntityModalComponent} from './entity-table/edit-entity-modal/edit-entity-modal.component';
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
import {SubjectModalComponent} from './subject/subject-modal/subject-modal.component';
import {TimeTableComponent} from './time-table/time-table.component';
import {TimeTableModalComponent} from './time-table/timetable-modal/time-table-modal.component';
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
import {InfoModalComponent} from './info-modal/info-modal.component';
import {TestComponent} from './test/test.component';
import {TestDetailComponent} from './test-detail/test-detail.component';
import {TestService} from './test/test.service';
import {TestDetailService} from './test-detail/test-detail.service';
import {UpdateDeleteEntityService} from './entity-table/update-delete-entity.service';
import {AnswerService} from './test/answer/answer.service';
import {QuestionService} from './test/question/question.service';
import {InfoModalService} from './info-modal/info-modal.service';
import {SpecialityModalComponent} from './speciality/speciality-modal/speciality-modal.component';

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
    EditEntityModalComponent,
    DeleteConfirmModalComponent,
    StudentAddModalComponent,
    SpecialityModalComponent,
    InfoModalComponent,
    TestComponent,
    TestDetailComponent,
    TimeTableModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainRoutingModule,
    MainMaterialModule,
    FormsModule
  ],
  entryComponents: [
    DeleteConfirmModalComponent,
    EditEntityModalComponent,
    SubjectModalComponent,
    StudentAddModalComponent,
    SpecialityModalComponent,
    InfoModalComponent,
    TimeTableModalComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
    UpdateDeleteEntityService,
    StudentService,
    SpecialityService,
    GroupsService,
    SubjectService,
    FacultyService,
    TimeTableService,
    TestService,
    TestDetailService,
    SpinnerService,
    AnswerService,
    QuestionService,
    InfoModalService
  ]
})
export class MainModule {
}
