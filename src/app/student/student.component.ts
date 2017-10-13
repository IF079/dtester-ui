import {Component, OnInit} from '@angular/core';
import {StudentService} from './../shared/services/student.service';
import {Student} from './../shared/entities/student';

@Component({
  selector: 'app-students',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  students: Student[];
  student: Student;

  constructor(private studentService: StudentService) { }

  ngOnInit() {

    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      console.log(this.students);
    });

    this.studentService.getStudent(8).subscribe(data => {
      this.student = data[0];
      console.log(this.student);
    });

  }

}
