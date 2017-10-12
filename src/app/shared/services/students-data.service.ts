import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Student} from './../entities/student';

@Injectable()
export class StudentsDataService {

  URL = '/Student';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
  	return this.http.get(`${this.URL}/getRecords`);
  }

  getStudent(id): Observable<Student> {
  	return this.http.get(`${this.URL}/getRecords/${id}`);
  }

}
