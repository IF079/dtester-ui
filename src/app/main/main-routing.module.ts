import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {StudentComponent} from './student/student.component';
import {SpecialityComponent} from './speciality/speciality.component';
import {StudentDetailComponent} from './student-detail/student-detail.component';
import {SubjectComponent} from './subject/subject.component';
import {FacultiesComponent} from './faculties/faculties.component';
import {GroupsComponent} from './groups/groups.component';
import {TimeTableComponent} from './time-table/time-table.component';
import {MainComponent} from './main.component';



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
          {path: 'students/:currentPage', component: StudentComponent},
          {path: 'student/:id', component: StudentDetailComponent},
          {path: 'specialities/:currentPage', component: SpecialityComponent},
          {path: 'subjects/:currentPage', component: SubjectComponent},
          {path: 'faculties/:currentPage', component: FacultiesComponent},
          {path: 'groups/:currentPage', component: GroupsComponent},
          {path: 'timetable/:currentPage', component: TimeTableComponent}
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
