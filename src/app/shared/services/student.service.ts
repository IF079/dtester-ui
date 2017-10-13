import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Student} from './../entities/student';

@Injectable()
export class StudentService {

  URL = '/Student';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get(`${this.URL}/getRecords`);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get(`${this.URL}/getRecords/${id}`);
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
