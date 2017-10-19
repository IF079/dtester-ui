import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {StudentComponent} from './student/student.component';
import {StudentDetailComponent} from './student-detail/student-detail.component';

import {SpecialityComponent} from './speciality/speciality.component';

import {SubjectComponent} from './subject/subject.component';

import {FacultiesComponent} from './faculties/faculties.component';
import {TimeTableComponent} from './time-table/time-table.component';


const appRoutes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'students', component: StudentComponent},
  {path: 'students/:id', component: StudentDetailComponent},
  {path: 'speciality', component: SpecialityComponent},
  {path: 'subject', component: SubjectComponent},
  {path: 'subject/:currPage', component: SubjectComponent},
  {path: 'faculties', component: FacultiesComponent},
  {path: 'timetable', component: TimeTableComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
