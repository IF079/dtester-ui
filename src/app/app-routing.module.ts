import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {StudentsComponent} from './students/students.component';

import {SpecialityComponent} from './speciality/speciality.component';

import {SubjectsComponent} from './subjects/subjects.component';


const appRoutes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'speciality', component: SpecialityComponent},
  {path: 'subjects', component: SubjectsComponent}

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
