import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Faculty} from '../../entities/faculty';

@Injectable()
export class FacultyService {
  URL = '/Faculty';

  constructor(private http: HttpClient) {
  }

  getFaculties(): Observable<Faculty[]> {
    return this.http.get(`${this.URL}/getRecords`);
  }

  getFaculty(id: number): Observable<Faculty> {
    return this.http.get(`${this.URL}/getRecords/${id}`);
  }

  addFaculty(data): Observable<any> {
    return this.http.post(`${this.URL}/insertData`, data);
  }

}
