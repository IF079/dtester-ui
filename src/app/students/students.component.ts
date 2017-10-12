import {Component, OnInit} from '@angular/core';
import {StudentsDataService} from './../shared/services/students-data.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  studentsData = [] as any;

  constructor(private newService: StudentsDataService) {
  }

  ngOnInit() {
    this.newService.getData().subscribe(data => {
      this.studentsData = data;
      console.log(data);
    });
  }

}
