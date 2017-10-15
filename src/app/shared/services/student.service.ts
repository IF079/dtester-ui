import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Student} from '../entities/student';
import {StudentDto} from './dto/student-dto';
import {LoggerFactory} from '../logger/logger.factory';

@Injectable()
export class StudentService {

  URL = '/Student';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<StudentDto[]>(`${this.URL}/getRecords`)
      .map(
        studentDtoArr => {
          log.info('raw', studentDtoArr);
          return studentDtoArr.map(
          studentDto => new StudentDto(studentDto).toStudent()
        );
        }
      );
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<StudentDto>(`${this.URL}/getRecords/${id}`)
      .map(
        studentDto => new StudentDto(studentDto).toStudent()
      );
  }

  setStudent(data): Observable<any> {
    return this.http.post(`${this.URL}/insertData`, data);
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
