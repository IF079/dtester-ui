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
  entityName = 'student';
  tableColumns = ['ID', 'Gradebook ID', 'Прізвище', 'Ім\'я', 'По-батькові', 'ID групи'];
  path = '/student';

  selectedStudent: Student;

  constructor(private studentService: StudentService) {
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

    /*this.studentService.setStudent({
      gradebookId : 'WR-9999384',
      studentSurname : 'Вацик',
      studentName : 'Дмитро',
      studentFname : 'Станіславович',
      groupId : '10',
      photo: 'base64-img'
    }, {
      username: 'hell_demon_666',
      password: '1qaz2wsx3edc',
      passwordConfirm: '1qaz2wsx3edc',
      email: 'hell_demon_666@gmail.com',
    }).subscribe(data => {
      console.log(data);
    });*/

  }
}

const log = LoggerFactory.create(StudentComponent);
