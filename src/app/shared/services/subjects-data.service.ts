import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from './../entities/subject';

@Injectable()
export class SubjectsDataService {
  URL = '/Subject';
  constructor(private http: HttpClient) {

  }
  getData(): Observable<Subject[]> {
   return this.http.get(`${this.URL}/getRecords`);
  }

}
