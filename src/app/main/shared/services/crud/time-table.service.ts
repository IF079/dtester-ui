import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {TimeTable} from '../../entities/time-table';
import {RecordsCount} from '../../entities/recordsCount';

@Injectable()

export class TimeTableService {
  URL = '/TimeTable';
  constructor(private http: HttpClient) {
  }
  getTimeTables(limit: number, offset: number): Observable<any[]> {
    return Observable.forkJoin(
      this.http.get<TimeTable[]>(`${this.URL}/getRecordsRange/${limit}/${offset}`),
      this.http.get<RecordsCount>(`${this.URL}/countRecords`)
    );
  }

  getTimeTable(id: number): Observable<TimeTable> {
    return this.http.get(`${this.URL}/getRecords/${id}`);
  }

  addTimeTable(data): Observable<any> {
    return this.http.post(`${this.URL}/insertData`, data);
  }
}
