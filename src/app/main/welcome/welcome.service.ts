import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {RecordsCount} from '../shared/entities/recordsCount';
import {url} from '../shared/constants/url-constants';

@Injectable()

export class WelcomeService {
  constructor(private http: HttpClient) {
  }

  getAllEntitiesCount(): Observable<RecordsCount[]> {
      return Observable.forkJoin(
        this.http.get<RecordsCount>(`${url.facultyUrl}${url.getCount}`),
        this.http.get<RecordsCount>(`${url.specialityUrl}${url.getCount}`),
        this.http.get<RecordsCount>(`${url.groupUrl}${url.getCount}`),
        this.http.get<RecordsCount>(`${url.subjectUrl}${url.getCount}`),
        this.http.get<RecordsCount>(`${url.timeTableUrl}${url.getCount}`),
        this.http.get<RecordsCount>(`${url.adminUser}${url.getCount}`)
      );
  }

}
