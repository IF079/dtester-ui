import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {Subject} from 'rxjs/Subject';

import {Faculty} from './faculty';
import {RecordsCount} from '../shared/entities/recordsCount';
import {url} from '../shared/constants/url-constants';

@Injectable()

export class FacultyService {
  constructor(private http: HttpClient) {
  }

  private facultyAddedSource = new Subject<Faculty>();

  facultyAdded$ = this.facultyAddedSource.asObservable();

  passAdded(item: Faculty) {
    this.facultyAddedSource.next(item);
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
