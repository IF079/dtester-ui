import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Faculty} from '../../entities/faculty';
import {RecordsCount} from '../../entities/recordsCount';

@Injectable()

export class FacultyService {
  URL = '/Faculty';
  constructor(private http: HttpClient) {
  }

  getFaculties(limit: number, offset: number): Observable<any[]> {
    return Observable.forkJoin(
      this.http.get<Faculty[]>(`${this.URL}/getRecordsRange/${limit}/${offset}`),
      this.http.get<RecordsCount>(`${this.URL}/countRecords`)
    );
  }

  getFaculty(id: number): Observable<Faculty> {
    return this.http.get(`${this.URL}/getRecords/${id}`);
  }

  addFaculty(data): Observable<any> {
    return this.http.post(`${this.URL}/insertData`, data);
  }
}
