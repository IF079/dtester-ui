import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class BasicEntityGridService {

  constructor(private http: HttpClient) {
  }

  deleteElement(id, entityName): Observable<any> {
    return this.http.delete(`/${entityName}/del/${id}`);
  }

}
