import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs/Observable';

import {url} from '../shared/constants/url-constants';
import {Subject} from 'rxjs/Subject';
import {Group} from '../groups/group';
import {TimeTable} from '../time-table/time-table';

@Injectable()
export class UpdateDeleteEntityService {
  constructor(private http: HttpClient) {
  }
  // Observable string sources
  private insertedEntitySource = new Subject();
  private updatedEntitySource = new Subject();

  private timeTableInsertedSource = new Subject();
  private subjectInsertedSource = new Subject();
  private groupInsertedSource = new Subject();
  private subjectUpdatedSource = new Subject();
  private studentUpdatedSource = new Subject();
  private studentInsertedSource = new Subject();
  private recordDeletedInDatabaseSource = new Subject();

  private groupUpdatedSource = new Subject<Group>();
  private specialityUpdatedSource = new Subject();
  private specialityInsertedSource = new Subject();
  private timetableUpdatedSource = new Subject<TimeTable>();
  private facultySource = new Subject();

  entityUpdated$ = this.updatedEntitySource.asObservable();
  entityInserted$ = this.insertedEntitySource.asObservable();
  studentInserted$ = this.studentInsertedSource.asObservable();
  timeTableInserted$ = this.timeTableInsertedSource.asObservable();
  groupInserted$ = this.groupInsertedSource.asObservable();
  subjectInserted$ = this.subjectInsertedSource.asObservable();

  recordDeletedInDataBase$ = this.recordDeletedInDatabaseSource.asObservable();
  specialityInserted$ = this.specialityInsertedSource.asObservable();
  timetableUpdated$ = this.timetableUpdatedSource.asObservable();

  passUpdatedEntity<T>(item: T) {
    this.updatedEntitySource.next(item);
  }
  passInsertedEntity (item) {
    this.insertedEntitySource.next(item);
  }

  passInsertedStudent(item) {
    this.studentInsertedSource.next(item);
  }

  passInsertedTimetable(item) {
    this.timeTableInsertedSource.next(item);
  }

  passInsertedGroup(item) {
    this.groupInsertedSource.next(item);
  }

  passInsertedSubject(item) {
    this.subjectInsertedSource.next(item);
  }


  passUpdatedTimetable(item: TimeTable) {
    this.timetableUpdatedSource.next(item);
  }


  passInsertedSpeciality(item) {
    this.specialityInsertedSource.next(item);
  }


  passUpdatedGroup(item: Group) {
    this.groupUpdatedSource.next(item);
  }

  passDeleted(item) {
    this.recordDeletedInDatabaseSource.next(item);
  }

  updateEntity(id: number, entity: string, dto: any): Observable<any> {
    return this.http.post(`/${entity}${url.update}/${id}`, dto);
  }

  deleteEntity(id: number, entity: string): Observable<any> {
    return this.http.get(`/${entity}${url.delete}/${id}`);
  }
}
