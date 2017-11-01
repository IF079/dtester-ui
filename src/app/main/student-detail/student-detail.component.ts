import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, ParamMap} from '@angular/router';

import 'rxjs/add/operator/mergeMap';

import {Student} from '../student/student';
import {StudentService} from '../student/student.service';


@Component({
    selector: 'app-student-detail',
    templateUrl: './student-detail.component.html',
    styleUrls: ['./student-detail.component.scss']
})

export class StudentDetailComponent implements OnInit {
  student: Student;

  constructor(
      private studentService: StudentService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

  goBack(): void {
      this.location.back();
    }

  ngOnInit() {
      this.route.paramMap.mergeMap((params: ParamMap) => {
        const id = +params.get('id');
          return this.studentService.getStudent(id);
        }).subscribe((data) => {
            this.student = data[0];
      });
   }
}
