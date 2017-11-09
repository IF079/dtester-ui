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
      {
        path: '',
        children: [
          {path: 'welcome', component: WelcomeComponent},
          {path: 'students', component: StudentComponent, canActivate: [AdminGuard]},
          {path: 'student/:id', component: StudentDetailComponent, canActivate: [AdminGuard]},
          {path: 'specialities', component: SpecialityComponent, canActivate: [AdminGuard]},
          {path: 'subjects', component: SubjectComponent, canActivate: [AdminGuard]},
          {path: 'faculties', component: FacultiesComponent, canActivate: [AdminGuard]},
          {path: 'groups', component: GroupsComponent, canActivate: [AdminGuard]},
          {path: 'timetable', component: TimeTableComponent, canActivate: [AdminGuard]},
          {path: 'test', component: TestDetailComponent, canActivate: [AdminGuard]},
          {path: '**', redirectTo: 'welcome', pathMath: 'full'}
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
  ],
  providers: [
    AdminGuard
  ]
})
export class MainRoutingModule {
}
