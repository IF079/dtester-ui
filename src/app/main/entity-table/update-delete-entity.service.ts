import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {url} from '../shared/constants/url-constants';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UpdateDeleteEntityService {

  constructor(private http: HttpClient) {

  }

  // Observable string sources
  private recordUpdatedSource = new Subject();
  private recordDeletedSource = new Subject();

  recordUpdated$ = this.recordUpdatedSource.asObservable();
  recordDeleted$ = this.recordDeletedSource.asObservable();

  passUpdated (item) {
    this.recordUpdatedSource.next(item);
  }

  passErrorWhenUpdate (err) {
    this.recordUpdatedSource.error(err);
  }

  passDeleted (item) {
    this.recordDeletedSource.next(item);
  }

  passErrorWhenDelete (err) {
    this.recordDeletedSource.error(err);
  }


  updateEntity(id: number, entity: string, dto: any): Observable<any> {
    return this.http.post(`/${entity}${url.update}/${id}`, dto);
  }

  deleteEntity(id: number, entity: string): Observable<any> {
    return this.http.get(`/${entity}${url.delete}/${id}`);
  }
}
