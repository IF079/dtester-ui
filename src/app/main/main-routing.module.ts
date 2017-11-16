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
import {TestDetailComponent} from './test-detail/test-detail.component';
import {TestPlayerComponent} from "./test-player/test-player.component";
import {AdminGuard} from './admin.guard';

const mainRoutes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {
        path: '',
        children: [
          {path: 'groups/:groupId', component: StudentComponent},
          {path: 'students', redirectTo: '/groups', pathMatch: 'full'},
          {path: 'student/:id', component: StudentDetailComponent},
          {path: 'specialities', component: SpecialityComponent},
          {path: 'subjects', component: SubjectComponent},
          {path: 'faculties', component: FacultiesComponent},
          {path: 'groups', component: GroupsComponent},
          {path: 'timetable', component: TimeTableComponent},
        ],
        canActivate: [AdminGuard]
      }, {path: 'test-player', component: TestPlayerComponent},
          {path: '**', redirectTo: 'welcome', pathMath: 'full'}
        ]
      }

    ]


;


@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AdminGuard
  ]
})
export class MainRoutingModule {
}
