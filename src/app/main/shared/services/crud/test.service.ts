import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Test} from '../../entities/test';

@Injectable()

export class TestService {
  URL = '/Test';
  constructor(private http: HttpClient) {
  }

  getTests(): Observable<Test[]> {
    return this.http.get(`${this.URL}/getRecords`);
  }

  getTest(id: number): Observable<Test> {
    return this.http.get(`${this.URL}/getRecords/${id}`);
  }

  addTest(data): Observable<any> {
    return this.http.post(`${this.URL}/insertData`, data);
  }
}
