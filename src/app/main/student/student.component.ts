import {Component, OnInit} from '@angular/core';

import {StudentService} from '../shared/services/crud/student.service';
import {Student} from '../shared/entities/student';
import {LoggerFactory} from '../../shared/logger/logger.factory';

@Component({
  selector: 'app-students',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {
  students: Student[];
  student: Student = new Student();
  headingColumnsOfTable = ['№', '№ Залікової книжки', 'Прізвище', 'Ім\'я', 'По-батькові', '№ групи'];
  errWithDisplayingStudents: string;
  placeholders = ['Прізвище', 'Ім\'я', 'По-батькові',
                  '№ групи', '№ залікової книжки', 'Фото',
                  'Username', 'Email', 'Пароль', 'Підтвердження паролю'];
  offset = 0;
  currentPage = 1;
  limitPerPage = 10;
  numberOfRecords: number;
  isLoading = false;
  selectedStudent: Student;
  constructor(private studentService: StudentService) {
  }

  goPage(n: number): void {
    this.offset = (this.limitPerPage * n) - this.limitPerPage;
    this.getStudents();
  }

  goPrev(): void {
    this.offset -= this.limitPerPage;
    this.getStudents();
  }

  goNext(): void {
    this.offset += this.limitPerPage;
    this.getStudents();
  }

  getStudents(): void {
    this.isLoading = true;
    this.studentService.getStudents(this.limitPerPage, this.offset).subscribe(data => {
        this.students = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
        this.students.forEach(item => {
          delete item.photo;
          delete item.plainPassword;
        });
        this.isLoading = false;
      },
      err => {
        log.error(err);
        this.errWithDisplayingStudents = 'Something is wrong with displaying data. Please try again.';
      });
  }

  ngOnInit() {
    this.getStudents();
  }
}

const log = LoggerFactory.create(StudentComponent);
