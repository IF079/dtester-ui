import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Group} from '../../entities/group';
import {RecordsCount} from '../../entities/recordsCount';
import {urlConstants} from '../../constants/url-constants';

@Injectable()

export class GroupsService {
  constructor(private http: HttpClient) {
  }
  getGroups(limit: number, offset: number): Observable<any[]> {
    return Observable.forkJoin(
      this.http.get<Group[]>(`${urlConstants.groupUrl}${urlConstants.getRecordsRange}/${limit}/${offset}`),
      this.http.get<RecordsCount>(`${urlConstants.groupUrl}${urlConstants.getCount}`)
    );
  }

  get(id: number): Observable<Group> {
    return this.http.get(`${urlConstants.groupUrl}${urlConstants.getRecords}/${id}`);
  }

  addGroup(data): Observable<any> {
    return this.http.post(`${urlConstants.groupUrl}${urlConstants.insertData}`, data);
  }
}
