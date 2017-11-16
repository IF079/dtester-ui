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
import {TestPlayerComponent} from "./test-player/test-player.component";
import {TestPlayerService} from "./test-player/test-player.service";




@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
    FacultiesComponent,
    FacultyModalComponent,
    GroupsComponent,
    GroupsModalComponent,
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
    TestModalComponent,
    ResultAddModalComponent,
    EditSpecialityModalComponent,
    EditFacultyModalComponent,
    EditStudentModalComponent,
    EditTimetableModalComponent,
    TestPlayerComponent
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
    EditSubjectModalComponent,
    SubjectModalComponent,
    StudentAddModalComponent,
    SpecialityModalComponent,
    InfoModalComponent,
    FacultyModalComponent,
    TimeTableModalComponent,
    GroupsModalComponent,
    QuestionAddModalComponent,
    TestModalComponent,
    ResultAddModalComponent,
    EditGroupsModalComponent,
    EditSpecialityModalComponent,
    EditFacultyModalComponent,
    EditStudentModalComponent,
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
    ResultService,
    TestPlayerService
  ]
}
)
