import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {RecordsCount} from '../../shared/entities/recordsCount';
import {url} from '../../shared/constants/url-constants';
import {Admin} from '../admin-classes/Admin';

@Injectable()

export class AdminService {
  constructor(private http: HttpClient) {
  }


  getAdminsRange(limit: number, offset: number): Observable<[Admin[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<Admin[]>(`${url.adminUser}${url.getRecordsRange}/${limit}/${offset}`),
      this.http.get<RecordsCount>(`${url.adminUser}${url.getCount}`)
    );
  }

  addAdmin(data): Observable<any> {
    return this.http.post(`${url.adminUser}${url.insertData}`, data);
  }

  checkUserName(username: string): Observable<any> {
    return this.http.get(`${url.adminUser}${url.checkUserName}/${username}`);
  }

  checkEmailAddress(email: string): Observable<any> {
    return this.http.get(`${url.adminUser}${url.checkEmailAddress}/${email}`);
  }
}
