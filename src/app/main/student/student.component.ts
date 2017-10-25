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
  headingColumnsOfTable = ['№', '№ Залікової книжки', 'Прізвище', 'Ім\'я', 'По-батькові', 'ID групи'];
  path = '/student';
  errWithDisplayingStudents: string;
  errWithCountingStudents: string;
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
        this.students = data;
        this.students.forEach(item => {
          delete item.photo;
          delete item.plainPassword;
        });
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.errWithDisplayingStudents = 'Something is wrong with displaying data. Please try again.';
      });
  }

  countRecords(): void {
    this.studentService.countSubjects().subscribe(data => {
        this.numberOfRecords = parseInt(data.numberOfRecords, 10);
      },
      err => {
        console.log(err);
        this.errWithCountingStudents = 'Something is wrong with displaying the number of students';
      });
  }

  ngOnInit() {
    this.getStudents();
    this.countRecords();
  }
}
const log = LoggerFactory.create(StudentComponent);
