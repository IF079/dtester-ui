import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Group} from '../../entities/group';
import {RecordsCount} from '../../entities/recordsCount';

@Injectable()

export class GroupsService {
  URL = '/Group';
  constructor(private http: HttpClient) {
  }
  getGroups(limit: number, offset: number): Observable<any[]> {
    return Observable.forkJoin(
      this.http.get<Group[]>(`${this.URL}/getRecordsRange/${limit}/${offset}`),
      this.http.get<Group>(`${this.URL}/countRecords`)
    );
  }

  get(id: number): Observable<Group> {
    return this.http.get(`${this.URL}/getRecords/${id}`);
  }

  addGroup(data): Observable<any> {
    return this.http.post(`${this.URL}/insertData`, data);
  }
}
