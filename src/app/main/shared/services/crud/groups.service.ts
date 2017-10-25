import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Group} from '../../entities/group';
import {RecordsCount} from '../../entities/recordsCount';

@Injectable()

export class GroupsService {
  URL = '/Group';
  constructor(private http: HttpClient) {
  }
  getGroups(limit: number, offset: number): Observable<Group[]> {
    return this.http.get(`${this.URL}/getRecordsRange/${limit}/${offset}`);
  }

  get(id: number): Observable<Group> {
    return this.http.get(`${this.URL}/getRecords/${id}`);
  }

  addGroup(data): Observable<any> {
    return this.http.post(`${this.URL}/insertData`, data);
  }
  countGroups(): Observable<RecordsCount> {
    return this.http.get(`${this.URL}/countRecords`);
  }
}
