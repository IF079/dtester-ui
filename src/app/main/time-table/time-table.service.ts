import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {TimeTable} from './time-table';
import {RecordsCount} from '../shared/entities/recordsCount';
import {url} from '../shared/constants/url-constants';

@Injectable()

export class TimeTableService {
  constructor(private http: HttpClient) {
  }
  getTimeTables(limit: number, offset: number): Observable<[TimeTable[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<TimeTable[]>(`${url.timeTableUrl}${url.getRecordsRange}/${limit}/${offset}`),
      this.http.get<RecordsCount>(`${url.timeTableUrl}${url.getCount}`)
    );
  }

  getTimeTable(id: number): Observable<any> {
    return this.http.get(`${url.timeTableUrl}${url.getRecords}${id}`);
  }

  addTimeTable(data): Observable<any> {
    return this.http.post(`${url.timeTableUrl}${url.insertData}`, data);
  }
}
