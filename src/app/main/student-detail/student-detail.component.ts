import {Component, OnInit, Input} from '@angular/core';
import {Student} from '../shared/entities/student';
import {StudentService} from '../shared/services/crud/student.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})

export class StudentDetailComponent implements OnInit {
  student: Student;

  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      const id = +params.get('id');
      return this.studentService.getStudent(id);
    }).subscribe((data) => {
      this.student = data[0];
    });

  }
}
