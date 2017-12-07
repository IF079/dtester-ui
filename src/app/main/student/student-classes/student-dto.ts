import {Student} from './student';

export class StudentDto {
  user_id: number;
  username: string;
  password: string;
  password_confirm: string;
  email: string;
  gradebook_id: string;
  student_name: string;
  student_fname: string;
  student_surname: string;
  group_id: string;
  plain_password: string;
  photo: string;

  constructor(student: Student, otherDtoInfo: OtherDtoInfo) {
    this.user_id = student.userId;
    this.login = otherDtoInfo.username;
    this.password = otherDtoInfo.password;
    this.password_confirm = otherDtoInfo.passwordConfirm;
    this.email = otherDtoInfo.email;
    this.gradebook_id = student.gradebookId;
    this.student_name = student.studentName;
    this.student_fname = student.studentFname;
    this.student_surname = student.studentSurname;
    this.group_id = student.groupId;
    this.plain_password = otherDtoInfo.password;
    this.photo = student.photo;
  }
}

export class OtherDtoInfo {
  password: string;
  passwordConfirm: string;
  email: string;
  username: string;
}
