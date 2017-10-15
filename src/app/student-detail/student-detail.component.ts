import {Component, Input} from '@angular/core';
import {Student} from './../shared/entities/student';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})

export class StudentDetailComponent {
  @Input() student: Student;
}
