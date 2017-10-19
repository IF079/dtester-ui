import {Component, OnInit, Input} from '@angular/core';
import {Student} from '../shared/entities/student';
import {StudentService} from '../shared/services/student.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})

export class StudentDetailComponent implements OnInit {
  student: Student;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.studentService.getStudent(id).subscribe(data => {
      this.student = data[0];
      console.log(this.student);
    });
  }
}
