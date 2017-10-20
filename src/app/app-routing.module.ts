import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from './main/welcome/welcome.component';
import {StudentComponent} from './main/student/student.component';

import {SpecialityComponent} from './main/speciality/speciality.component';

import {SubjectComponent} from './main/subject/subject.component';

import {FacultiesComponent} from './main/faculties/faculties.component';
import {TimeTableComponent} from './main/time-table/time-table.component';


const appRoutes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'students', component: StudentComponent},
  {path: 'speciality', component: SpecialityComponent},
  {path: 'subject', component: SubjectComponent},
  {path: 'subject/:currentPage', component: SubjectComponent},
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
