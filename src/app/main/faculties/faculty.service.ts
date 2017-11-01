import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Faculty} from './faculty';
import {RecordsCount} from '../shared/entities/recordsCount';
import {urlConstants} from '../shared/constants/url-constants';

@Injectable()

export class FacultyService {
  constructor(private http: HttpClient) {
  }

  getFaculties(limit: number, offset: number): Observable<[Faculty[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<Faculty[]>(`${urlConstants.facultyUrl}${urlConstants.getRecordsRange}/${limit}/${offset}`),
      this.http.get<RecordsCount>(`${urlConstants.facultyUrl}${urlConstants.getCount}`)
    );
  }

  getFaculty(id: number): Observable<Faculty> {
    return this.http.get(`${urlConstants.facultyUrl}${urlConstants.getRecords}${id}`);
  }

  addFaculty(data): Observable<any> {
    return this.http.post(`${urlConstants.facultyUrl}${urlConstants.insertData}`, data);
  }
}
