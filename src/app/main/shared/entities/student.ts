import {StudentDto} from '../../shared/services/crud/dto/student-dto';

export class Student {
  userId?: number;
  gradebookId: string;
  studentSurname: string;
  studentName: string;
  studentFname: string;
  groupId: string;
  plainPassword?: string;
  photo: string;

  constructor(studentDto: StudentDto) {
    this.userId = studentDto.user_id;
    this.gradebookId = studentDto.gradebook_id;
    this.studentSurname = studentDto.student_surname;
    this.studentName = studentDto.student_name;
    this.studentFname = studentDto.student_fname;
    this.groupId = studentDto.group_id;
    this.plainPassword = studentDto.plain_password;
    this.photo = studentDto.photo;
  }
}
