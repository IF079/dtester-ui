import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Faculty} from './faculty';
import {RecordsCount} from '../shared/entities/recordsCount';
import {url} from '../shared/constants/url-constants';

@Injectable()

export class FacultyService {
  constructor(private http: HttpClient) {
  }

  getFacultiesRange(limit: number, offset: number): Observable<[Faculty[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<Faculty[]>(`${url.facultyUrl}${url.getRecordsRange}/${limit}/${offset}`),
      this.http.get<RecordsCount>(`${url.facultyUrl}${url.getCount}`)
    );
  }

  addFaculty(data): Observable<any> {
    return this.http.post(`${url.facultyUrl}${url.insertData}`, data);
  }
}
