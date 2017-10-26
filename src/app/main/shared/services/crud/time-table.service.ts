import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {TimeTable} from '../../entities/time-table';
import {RecordsCount} from '../../entities/recordsCount';
import {urlConstants} from '../../constants/url-constants';

@Injectable()

export class TimeTableService {
  constructor(private http: HttpClient) {
  }
  getTimeTables(limit: number, offset: number): Observable<[TimeTable[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<TimeTable[]>(`${urlConstants.timeTableUrl}${urlConstants.getRecordsRange}/${limit}/${offset}`),
      this.http.get<RecordsCount>(`${urlConstants.timeTableUrl}${urlConstants.getCount}`)
    );
  }

  getTimeTable(id: number): Observable<TimeTable> {
    return this.http.get(`${urlConstants.timeTableUrl}${urlConstants.getRecords}${id}`);
  }

  addTimeTable(data): Observable<any> {
    return this.http.post(`${urlConstants.timeTableUrl}${urlConstants.insertData}`, data);
  }
}
