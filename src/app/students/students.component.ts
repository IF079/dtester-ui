import {Component, OnInit} from '@angular/core';
import {StudentsDataService} from './../shared/services/students-data.service';
import {Student} from './../shared/entities/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students: Student[];
  student: Student;

  constructor(private studentService: StudentsDataService) { }

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
