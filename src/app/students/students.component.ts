import {Component, OnInit} from '@angular/core';
import {StudentsDataService} from './../shared/services/students-data.service';
import {Student} from './../shared/entities/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  studentsData: Student[];

  constructor() { }

  ngOnInit() {

  	// this.studentService.getData().subscribe(data => {
  	// 	this.studentsData = data;
  	// 	console.log(this.studentsData);
  	// });

  }

}
