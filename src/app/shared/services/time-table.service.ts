import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TimeTable} from './../entities/time-table';

@Injectable()
export class TimeTableService {
  URL = '/TimeTable';

  constructor(private http: HttpClient) {
  }

  getTimeTables(): Observable<TimeTable[]> {
    return this.http.get(`${this.URL}/getRecords`);
  }

  getTimeTable(id: number): Observable<TimeTable> {
    return this.http.get(`${this.URL}/getRecords/${id}`);
  }

  addTimeTable(data): Observable<any> {
    return this.http.post(`${this.URL}/insertData`, data);
  }

}
