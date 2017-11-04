import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Group} from './group';
import {RecordsCount} from '../shared/entities/recordsCount';
import {url} from '../shared/constants/url-constants';

@Injectable()

export class GroupsService {
  constructor(private http: HttpClient) {
  }
  getGroups(limit: number, offset: number): Observable<[Group[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<Group[]>(`${url.groupUrl}${url.getRecordsRange}/${limit}/${offset}`),
      this.http.get<RecordsCount>(`${url.groupUrl}${url.getCount}`)
    );
  }

  get(id: number): Observable<Group> {
    return this.http.get(`${url.groupUrl}${url.getRecords}/${id}`);
  }

  addGroup(data): Observable<any> {
    return this.http.post(`${url.groupUrl}${url.insertData}`, data);
  }
}
