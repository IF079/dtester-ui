import {Component, OnInit} from '@angular/core';

import {StudentService} from './student.service';
import {Student} from './student';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {generalConst} from '../shared/constants/general-constants';
import {StudentAddModalComponent} from './add-modal/add-modal.component';

@Component({
  selector: 'app-students',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {
  students: Student[];
  student: Student;
  headingColumnsOfTable = ['№', '№ Залікової книжки', 'Прізвище', 'Ім\'я', 'По-батькові', '№ групи' , '', ''];
  errWithDisplayingStudents: string;
  offset = 0;
  currentPage = 1;
  limitPerPage = 10;
  numberOfRecords: number;
  isLoading = false;
  constructor(private studentService: StudentService) {
  }

  getStudents(): void {
    this.studentService.getStudents(10, 0).subscribe(data => {
        this.students = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
        this.students.forEach(item => {
          delete item.photo;
          delete item.plainPassword;
        });
      },
      err => {
        log.error(err);
        this.errWithDisplayingStudents = generalConst.errorWithDisplayData;
      });
  }

  ngOnInit() {
    this.getStudents();
  }
}

const log = LoggerFactory.create(StudentComponent);
