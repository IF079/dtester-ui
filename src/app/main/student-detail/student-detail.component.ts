import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Student} from '../shared/entities/student';
import {StudentService} from '../shared/services/crud/student.service';

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
  ) {
  }
  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.studentService.getStudent(id).subscribe(data => {
      this.student = data[0];
      console.log(this.student);
    });
  }
}
