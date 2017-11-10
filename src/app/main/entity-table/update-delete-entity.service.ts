import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {url} from '../shared/constants/url-constants';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class UpdateDeleteEntityService {

  constructor(private http: HttpClient) {

  }
  // Observable string sources
  private recordUpdatedSource = new Subject();
  private recordDeletedSource = new Subject();

  recordUpdated$ = this.recordUpdatedSource.asObservable();
  passUpdated(obj) {
    this.recordUpdatedSource.next(obj);
  }

  updateEntity(id: number, entity: string, dto: any): Observable<any> {
    return this.http.post(`/${entity}${url.update}/${id}`, dto);
  }

  deleteEntity(id: number, entity: string): Observable<any> {
    return this.http.get(`/${entity}${url.delete}/${id}`);
  }
}
