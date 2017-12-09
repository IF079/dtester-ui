import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DeleteConfirmModalComponent} from './entity-table/delete-confirm-modal/delete-confirm-modal.component';
import {EditGroupsModalComponent} from './groups/edit-groups-modal/edit-groups-modal.component';
import {EditSubjectModalComponent} from './subject/edit-subject-modal/edit-subject-modal.component';
import {MainComponent} from './main.component';
import {MainRoutingModule} from './main-routing.module';
import {NavComponent} from './nav/nav.component';
import {FacultiesComponent} from './faculties/faculties.component';
import {FacultyModalComponent} from './faculties/add-faculty-modal/add-faculty-modal.component';
import {GroupsComponent} from './groups/groups.component';
import {AddGroupsModalComponent} from './groups/add-groups-modal/add-groups-modal.component';
import {SpecialityComponent} from './speciality/speciality.component';
import {StudentComponent} from './student/student.component';
import {AdminComponent} from './admin/admin.component';
import {AdminService} from './admin/admin-services/admin.service';
import {StudentDetailComponent} from './student-detail/student-detail.component';
import {SubjectComponent} from './subject/subject.component';
import {AddSubjectModalComponent} from './subject/add-subject-modal/add-subject-modal.component';
import {TimeTableComponent} from './time-table/time-table.component';
import {AddTimeTableModalComponent} from './time-table/add-timetable-modal/add-time-table-modal.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {MainMaterialModule} from './main-material.module';
import {StudentService} from './student/student-service/student.service';
import {SpecialityService} from './speciality/speciality-service/speciality.service';
import {SubjectService} from './subject/subject-service/subject.service';
import {SpinnerService} from './spinner/spinner.service';
import {GroupsService} from './groups/groups-service/groups.service';
import {SpinnerInterceptor} from './spinner/spinner.interceptor';
import {EntityTableComponent} from './entity-table/entity-table.component';
import {FacultyService} from './faculties/faculty.service';
import {TimeTableService} from './time-table/timetable-service/time-table.service';
import {StudentAddModalComponent} from './student/add-student-modal/add-modal.component';
import {InfoModalComponent} from './info-modal/info-modal.component';
import {TestComponent} from './test/test.component';
import {TestDetailComponent} from './test/test-detail/test-detail.component';
import {TestService} from './test/test.service';
import {TestDetailService} from './test/test-detail/test-detail.service';
import {UpdateDeleteEntityService} from './shared/services/update-delete-entity-service/update-delete-entity.service';
import {AnswerService} from './test/answer/answer.service';
import {QuestionService} from './test/question/question.service';
import {InfoModalService} from './info-modal/info-modal.service';
import {ResultService} from './test/result/result.service';
import {SpecialityModalComponent} from './speciality/add-speciality-modal/add-speciality-modal.component';
import {QuestionAddModalComponent} from './test/question/add-question-modal/add-question-modal.component';
import {TestModalComponent} from './test/add-test-modal/add-test-modal.component';
import {ResultAddModalComponent} from './test/result/result-add-modal/result-add-modal.component';
import {EditSpecialityModalComponent} from './speciality/edit-speciality-modal/edit-speciality-modal.component';
import {EditFacultyModalComponent} from './faculties/edit-faculty-modal/edit-faculty-modal.component';
import {EditStudentModalComponent} from './student/edit-student-modal/edit-student-modal.component';
import {EditTimetableModalComponent} from './time-table/edit-timetable-modal/edit-timetable-modal.component';
import {TestPlayerComponent} from './test-player/test-player.component';
import {TestPlayerService} from './test-player/test-player.service';
import {AddAdminModalComponent} from './admin/add-admin-modal/add-admin-modal.component';
import {AnswerComponent} from './test/answer/answer.component';
import {QuestionComponent} from './test/question/question.component';
import {EditTestModalComponent} from './test/edit-test-modal/edit-test-modal.component';
import {EditAdminModalComponent} from './admin/edit-admin-modal/edit-admin-modal.component';
import {EditQuestionModalComponent} from './test/question/edit-question-modal/edit-question-modal.component';


@NgModule({
  declarations: [
    AddAdminModalComponent,
    MainComponent,
    NavComponent,
    FacultiesComponent,
    FacultyModalComponent,
    AdminComponent,
    GroupsComponent,
    AddGroupsModalComponent,
    SpecialityComponent,
    StudentComponent,
    StudentDetailComponent,
    SubjectComponent,
    AddSubjectModalComponent,
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
    AddTimeTableModalComponent,
    QuestionAddModalComponent,
    TestModalComponent,
    ResultAddModalComponent,
    EditSpecialityModalComponent,
    EditFacultyModalComponent,
    EditStudentModalComponent,
    EditTimetableModalComponent,
    TestPlayerComponent,
    AnswerComponent,
    QuestionComponent,
    EditTestModalComponent,
    EditAdminModalComponent,
    EditQuestionModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainRoutingModule,
    MainMaterialModule,
    FormsModule
  ],
  entryComponents: [
    AddAdminModalComponent,
    DeleteConfirmModalComponent,
    EditSubjectModalComponent,
    AddSubjectModalComponent,
    StudentAddModalComponent,
    SpecialityModalComponent,
    InfoModalComponent,
    FacultyModalComponent,
    AddTimeTableModalComponent,
    AddGroupsModalComponent,
    QuestionAddModalComponent,
    TestModalComponent,
    ResultAddModalComponent,
    EditGroupsModalComponent,
    EditSpecialityModalComponent,
    EditFacultyModalComponent,
    EditStudentModalComponent,
    EditTimetableModalComponent,
    EditTestModalComponent,
    EditAdminModalComponent,
    EditQuestionModalComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
    UpdateDeleteEntityService,
    SubjectService,
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
    TestPlayerService,
    StudentService,
    AdminService
  ]
})
export class MainModule {
}
