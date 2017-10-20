import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {StudentComponent} from './student/student.component';
import {SpecialityComponent} from './speciality/speciality.component';
import {SubjectComponent} from './subject/subject.component';
import {FacultiesComponent} from './faculties/faculties.component';
import {GroupsComponent} from './groups/groups.component';
import {TimeTableComponent} from './time-table/time-table.component';
import {MainComponent} from './main.component';
import {TestsComponent} from './tests/tests.component';


const mainRoutes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        children: [
          {path: '', redirectTo: 'welcome', pathMatch: 'full'},
          {path: 'welcome', component: WelcomeComponent},
          {path: 'students', component: StudentComponent},
          {path: 'speciality', component: SpecialityComponent},
          {path: 'speciality/:currentPage', component: SpecialityComponent},
          {path: 'subject', component: SubjectComponent},
          {path: 'subject/:currentPage', component: SubjectComponent},
          {path: 'faculties', component: FacultiesComponent},
          {path: 'groups', component: GroupsComponent},
          {path: 'timetable', component: TimeTableComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule {
}
