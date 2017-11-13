import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {url} from '../shared/constants/url-constants';
import {Subject} from 'rxjs/Subject';
import {Group} from '../groups/group';
import 'rxjs/add/observable/forkJoin';
import {Faculty} from '../faculties/faculty';
import {SpecialityDto} from '../speciality/speciality-dto';
import {Speciality} from '../speciality/speciality';
import {RecordsCount} from '../shared/entities/recordsCount';


@Injectable()
export class UpdateDeleteEntityService {

  constructor(private http: HttpClient) {

  }


  // Observable string sources
  private subjectUpdatedSource = new Subject();
  private recordDeletedSource = new Subject();
  private facultyAndSpecialitySource = new Subject();
  private groupUpdatedSource = new Subject<Group>();
  private facultySource = new Subject();
  private specialitySource = new Subject();

  subjectUpdated$ = this.subjectUpdatedSource.asObservable();
  groupUpdated$ = this.groupUpdatedSource.asObservable();
  recordDeleted$ = this.recordDeletedSource.asObservable();
  getFaculty$ = this.facultySource.asObservable();
  getSpeciality$ = this.specialitySource.asObservable();

  private joinedSource = new Subject();
  groupSpecialityFaculty$ = Observable.forkJoin(this.joinedSource.asObservable());

  passUpdatedSubject(item) {
    this.subjectUpdatedSource.next(item);
  }

  passSpeciality(item) {
    this.specialitySource.next(item);
  }

  passUpdatedGroup(item: Group) {
    this.groupUpdatedSource.next(item);
  }


  passFaculty(item) {
    this.facultySource.next(item);
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
