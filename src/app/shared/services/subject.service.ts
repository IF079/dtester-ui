import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from '../entities/subject';
import {RecordsCount} from '../entities/recordsCount';

@Injectable()
export class SubjectService {
  URL = '/Subject';

  constructor(private http: HttpClient) {

  }

  getSubjects(limit: number, offset: number): Observable<Subject[]> {
    return this.http.get(`${this.URL}/getRecordsRange/${limit}/${offset}`);
  }

  getSubject(id: number) {
    return this.http.get(`${this.URL}/getRecords/id`);
  }

  addSubject(data: Subject) {
    return this.http.post(`${this.URL}/insertData`, data);
  }
  countSubjects(): Observable<RecordsCount> {
    return this.http.get(`${this.URL}/countRecords`);
  }

}
