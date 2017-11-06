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

  getGroups(): Observable<[Group[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<Group[]>(`${url.groupUrl}${url.getRecords}`),
      this.http.get<RecordsCount>(`${url.groupUrl}${url.getCount}`)
    );
  }

  getGroupsRange(limit: number, offset: number): Observable<[Group[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<Group[]>(`${url.groupUrl}${url.getRecordsRange}/${limit}/${offset}`),
      this.http.get<RecordsCount>(`${url.groupUrl}${url.getCount}`)
    );
  }

  getGroupById(id: number): Observable<Group> {
    return this.http.get(`${url.groupUrl}${url.getRecords}/${id}`);
  }

  getGroupByName(name: string): Observable<Group> {
    return this.http.get(`${url.groupUrl}${url.getRecordsBySearch}/${name}`);
  }

  addGroup(data): Observable<any> {
    return this.http.post(`${url.groupUrl}${url.insertData}`, data);
  }
}
