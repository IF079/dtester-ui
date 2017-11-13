import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {url} from '../shared/constants/url-constants';
import {Subject} from 'rxjs/Subject';
import {Group} from '../groups/group';

@Injectable()
export class UpdateDeleteEntityService {

  constructor(private http: HttpClient) {

  }



  // Observable string sources
  private subjectUpdatedSource = new Subject();
  private recordDeletedSource = new Subject();
  private facultyAndSpecialitySource = new Subject();
  private groupUpdatedSource = new Subject();


  subjectUpdated$ = this.subjectUpdatedSource.asObservable();
  groupUpdated$ = this.groupUpdatedSource.asObservable();
  recordDeleted$ = this.recordDeletedSource.asObservable();
  getFacultyAndSpeciality$ = this.facultyAndSpecialitySource.asObservable();

  passUpdatedSubject(item) {
    this.subjectUpdatedSource.next(item);
  }

  passUpdatedGroup(item) {
    this.groupUpdatedSource.next(item);
  }

  passFacultyAndSpeciality(item) {
    this.facultyAndSpecialitySource.next(item);
  }

  passErrorWhenUpdateSubject(err) {
    this.subjectUpdatedSource.error(err);
  }

  passDeleted(item) {
    this.recordDeletedSource.next(item);
  }

  passErrorWhenDelete(err) {
    this.recordDeletedSource.error(err);
  }


  updateEntity(id: number, entity: string, dto: any): Observable<any> {
    return this.http.post(`/${entity}${url.update}/${id}`, dto);
  }

  deleteEntity(id: number, entity: string): Observable<any> {
    return this.http.get(`/${entity}${url.delete}/${id}`);
  }
}
