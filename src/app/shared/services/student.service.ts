import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Student} from '../entities/student';
import {StudentDto} from './dto/student-dto';
import {LoggerFactory} from '../logger/logger.factory';

@Injectable()
export class StudentService {

  URL = '/Student';

  static parseStudent(student: Student): StudentDto {
    const dto = new StudentDto();

    dto.username = student.username;
    dto.password = student.password;
    dto.password_confirm = student.passwordConfirm;
    dto.email = student.email;
    dto.gradebook_id = student.gradebookId;
    dto.student_surname = student.studentSurname;
    dto.student_name = student.studentName;
    dto.student_fname = student.studentFname;
    dto.group_id = student.groupId;
    dto.plain_password = student.password;
    dto.photo = student.photo;

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

  constructor(private http: HttpClient) {
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<StudentDto[]>(`${this.URL}/getRecords`)
      .map(studentDtoArr => studentDtoArr.map(StudentService.toStudent));
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<StudentDto>(`${this.URL}/getRecords/${id}`)
      .map(StudentService.toStudent);
  }

  setStudent(student: Student): Observable<any> {
    return this.http.post(`${this.URL}/insertData`, StudentService.parseStudent(student));
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

const log = LoggerFactory.create(StudentService);
