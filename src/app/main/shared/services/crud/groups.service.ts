import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Groups} from '../../entities/groups';

@Injectable()
export class GroupsService {
  URL = '/Groups';

  constructor(private http: HttpClient) {
  }

  getGroups(): Observable<Groups[]> {
    return this.http.get(`${this.URL}/getRecords`);
  }

  get(id: number): Observable<Groups> {
    return this.http.get(`${this.URL}/getRecords/${id}`);
  }

  addGroup(data): Observable<any> {
    return this.http.post(`${this.URL}/insertData`, data);
  }

}
