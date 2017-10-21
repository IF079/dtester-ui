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
  tableColumns = ['ID', 'Gradebook ID', 'Прізвище', 'Ім\'я', 'По-батькові', 'ID групи'];
  path = '/students';

  selectedStudent: Student;

  constructor(private studentService: StudentService) {
  }

  onSelect(student: Student): void {
    this.selectedStudent = student;
  }

  ngOnInit() {

    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.students.forEach(item => {
        delete item.photo;
        delete item.plainPassword;
      });
      // console.log(this.students);
    });

    this.studentService.getStudent(16).subscribe(data => {
      this.student = data[0];
      // console.log(this.student);
    });

  }
}

const log = LoggerFactory.create(StudentComponent);
