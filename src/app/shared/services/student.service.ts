import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Student} from '../entities/student';
import {StudentDto} from './dto/student-dto';

class OtherDtoInfo {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
}

@Injectable()
export class StudentService {

  URL = '/Student';

  constructor(private http: HttpClient) {
  }

  static parseStudent(student: Student, otherDtoInfo: OtherDtoInfo): StudentDto {
    const dto = new StudentDto();

    dto.gradebook_id = student.gradebookId;
    dto.student_surname = student.studentSurname;
    dto.student_name = student.studentName;
    dto.student_fname = student.studentFname;
    dto.group_id = student.groupId;
    dto.photo = student.photo;

    dto.username = otherDtoInfo.username;
    dto.password = otherDtoInfo.password;
    dto.password_confirm = otherDtoInfo.passwordConfirm;
    dto.plain_password = otherDtoInfo.password;
    dto.email = otherDtoInfo.email;

    return dto;
  }

  static toStudent(studentDto: StudentDto): Student {
    const entity = new Student();

    entity.userId = studentDto.user_id;
    entity.gradebookId = studentDto.gradebook_id;
    entity.studentSurname = studentDto.student_surname;
    entity.studentName = studentDto.student_name;
    entity.studentFname = studentDto.student_fname;
    entity.groupId = studentDto.group_id;
    entity.plainPassword = studentDto.plain_password;
    entity.photo = studentDto.photo;

    return entity;
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<StudentDto[]>(`${this.URL}/getRecords`).map( studentDtoArr => studentDtoArr.map(StudentService.toStudent));
  }

  getStudent(id: number): Observable<Student[]> {
    return this.http.get<StudentDto[]>(`${this.URL}/getRecords/${id}`).map( studentDtoArr => studentDtoArr.map(StudentService.toStudent));
  }

  setStudent(student: Student, otherInfo: OtherDtoInfo): Observable<any> {
    return this.http.post(`${this.URL}/insertData`, StudentService.parseStudent(student, otherInfo));
  }

  /** setStudent input data example
   *
   * {
      username: 'username',
      password: 'password',
      password_confirm: 'password_confirm',
      email: 'email@gmail.com',
      gradebook_id : 'AU-4309358',
      student_name : 'student_name',
      student_fname : 'student_fname',
      student_surname : 'student_surname',
      group_id : '1',
      plain_password : 'plain_password',
      photo: ''
    }
   */

}
