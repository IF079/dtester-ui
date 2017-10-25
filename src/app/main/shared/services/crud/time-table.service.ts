import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {TimeTable} from '../../entities/time-table';
import {RecordsCount} from '../../entities/recordsCount';

@Injectable()

export class TimeTableService {
  URL = '/TimeTable';
  constructor(private http: HttpClient) {
  }
  countTimeTableRecords(): Observable<RecordsCount> {
    return this.http.get(`${this.URL}/countRecords`);
  }
  getTimeTables(limit: number, offset: number): Observable<TimeTable[]> {
    return this.http.get(`${this.URL}/getRecordsRange/${limit}/${offset}`);
  }

  getTimeTable(id: number): Observable<TimeTable> {
    return this.http.get(`${this.URL}/getRecords/${id}`);
  }

  addTimeTable(data): Observable<any> {
    return this.http.post(`${this.URL}/insertData`, data);
  }
}
