import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs/Observable';

import {url} from '../../shared/constants/url-constants';
import {Subject} from 'rxjs/Subject';
import {Group} from '../../groups/group';
import {TimeTable} from '../../time-table/time-table';

@Injectable()
export class UpdateDeleteEntityService {
  constructor(private http: HttpClient) {
  }

  // Observable string sources
  private insertedItemSource = new Subject();
  private updatedItemSource = new Subject();
  private itemDeletedSource = new Subject();

  itemUpdated$ = this.updatedItemSource.asObservable();
  itemInserted$ = this.insertedItemSource.asObservable();
  itemDeleted$ = this.itemDeletedSource.asObservable();

  passUpdatedEntity<T>(item: T) {
    this.updatedItemSource.next(item);
  }

  passInsertedItem<T>(item) {
    this.insertedItemSource.next(item);
  }

  passDeleted(item) {
    this.itemDeletedSource.next(item);
  }

  updateEntity(id: number, entity: string, dto: any): Observable<any> {
    return this.http.post(`/${entity}${url.update}/${id}`, dto);
  }

  deleteEntity(id: number, entity: string): Observable<any> {
    return this.http.get(`/${entity}${url.delete}/${id}`);
  }
}
