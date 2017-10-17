import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {StudentComponent} from './student/student.component';

import {SpecialityComponent} from './speciality/speciality.component';

import {SubjectComponent} from './subject/subject.component';

import {FacultiesComponent} from './faculties/faculties.component';


const appRoutes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'students', component: StudentComponent},
  {path: 'speciality', component: SpecialityComponent},
  {path: 'subject', component: SubjectComponent},
  {path: 'subject/:currPage', component: SubjectComponent},
  {path: 'faculties', component: FacultiesComponent}

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
