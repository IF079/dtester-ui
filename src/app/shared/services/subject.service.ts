import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from './../entities/subject';

@Injectable()
export class SubjectService {
  URL = '/Subject';

  constructor(private http: HttpClient) {

  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get(`${this.URL}/getRecords`);
  }

  getSubject(id: number) {
    return this.http.get(`${this.URL}/getRecords/id`);
  }

  addSubject(data: Subject) {
    return this.http.post(`${this.URL}/insertData`, data);
  }

}
