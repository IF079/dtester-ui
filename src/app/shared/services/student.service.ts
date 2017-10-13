import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Student} from './../entities/student';

@Injectable()
export class StudentService {

  URL = '/Student';

  data = JSON.stringify({
    gradebook_id : 'AU-8509358',
    student_name : 'Петро',
    student_fname : 'Петрович',
    student_surname : 'Петренко',
    plain_password : '123456qwerty',
    group_id : '2'
  });

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get(`${this.URL}/getRecords`);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get(`${this.URL}/getRecords/${id}`);
  }

}
