import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DeleteConfirmModalComponent} from './entity-table/delete-confirm-modal/delete-confirm-modal.component';
import {EditGroupsModalComponent} from './entity-table/edit-groups-modal/edit-groups-modal.component';
import {EditSubjectModalComponent} from './entity-table/edit-subject-modal/edit-subject-modal.component';
import {MainComponent} from './main.component';
import {MainRoutingModule} from './main-routing.module';
import {NavComponent} from './nav/nav.component';
import {FacultiesComponent} from './faculties/faculties.component';
import {FacultyModalComponent} from './faculties/faculty-modal/faculty-modal.component';
import {GroupsComponent} from './groups/groups.component';
import {GroupsModalComponent} from './groups/groups-modal/groups-modal.component';
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
import {ResultService} from './test/result/result.service';
import {SpecialityModalComponent} from './speciality/speciality-modal/speciality-modal.component';
import {QuestionAddModalComponent} from './test/question/question-add-modal/question-add-modal.component';
import {TestAddModalComponent} from './test/test-add-modal/test-add-modal.component';
import {ResultAddModalComponent} from './test/result/result-add-modal/result-add-modal.component';
import {EditSpecialityModalComponent} from './entity-table/edit-speciality-modal/edit-speciality-modal.component';
import {EditFacultyModalComponent} from './entity-table/edit-faculty-modal/edit-faculty-modal.component';
import {DeleteErrorModalComponent} from './entity-table/delete-error-modal/delete-error-modal.component';
import {EditTimetableModalComponent} from './entity-table/edit-timetable-modal/edit-timetable-modal.component';

@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
    FacultiesComponent,
    FacultyModalComponent,
    GroupsComponent,
    GroupsModalComponent,
    ModalComponent,
    SpecialityComponent,
    StudentComponent,
    StudentDetailComponent,
    SubjectComponent,
    SubjectModalComponent,
    TimeTableComponent,
    WelcomeComponent,
    EntityTableComponent,
    EditSubjectModalComponent,
    EditGroupsModalComponent,
    DeleteConfirmModalComponent,
    StudentAddModalComponent,
    SpecialityModalComponent,
    InfoModalComponent,
    TestComponent,
    TestDetailComponent,
    TimeTableModalComponent,
    QuestionAddModalComponent,
    TestAddModalComponent,
    ResultAddModalComponent,
    EditSpecialityModalComponent,
    EditFacultyModalComponent,
    DeleteErrorModalComponent,
    EditTimetableModalComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainRoutingModule,
    MainMaterialModule,
    FormsModule
  ],
  entryComponents: [
    DeleteErrorModalComponent,
    DeleteConfirmModalComponent,
    EditSubjectModalComponent,
    SubjectModalComponent,
    StudentAddModalComponent,
    SpecialityModalComponent,
    InfoModalComponent,
    FacultyModalComponent,
    TimeTableModalComponent,
    GroupsModalComponent,
    QuestionAddModalComponent,
    TestAddModalComponent,
    ResultAddModalComponent,
    EditGroupsModalComponent,
    EditSpecialityModalComponent,
    EditFacultyModalComponent,
    EditTimetableModalComponent
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
    InfoModalService,
    ResultService
  ]
})
export class MainModule {
}
