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
  private subjectInsertedSource = new Subject();
  private groupInsertedSource = new Subject();
  private subjectUpdatedSource = new Subject();
  private recordDeletedInDatabaseSource = new Subject();
  private facultyAndSpecialitySource = new Subject();
  private groupUpdatedSource = new Subject<Group>();
  private specialityUpdatedSource = new Subject();
  private specialityInsertedSource = new Subject();
  private timetableUpdatedSource = new Subject();

  private facultySource = new Subject();
  private specialitySource = new Subject();

  groupInserted$ = this.groupInsertedSource.asObservable();
  subjectInserted$ = this.subjectInsertedSource.asObservable();

  subjectUpdated$ = this.subjectUpdatedSource.asObservable();
  groupUpdated$ = this.groupUpdatedSource.asObservable();

  recordDeletedInDataBase$ = this.recordDeletedInDatabaseSource.asObservable();

  getFacultyAndSpeciality$ = this.facultyAndSpecialitySource.asObservable();
  specialityUpdated$ = this.specialityUpdatedSource.asObservable();
  specialityInserted$ = this.specialityInsertedSource.asObservable();
  timetableUpdated$ = this.timetableUpdatedSource.asObservable();
  facultyUpdated$ = this.facultySource.asObservable();
  getSpeciality$ = this.specialitySource.asObservable();
  private joinedSource = new Subject();
  groupSpecialityFaculty$ = Observable.forkJoin(this.joinedSource.asObservable());

  passInsertedGroup(item) {
    this.groupInsertedSource.next(item);
  }

  passInsertedSubject(item) {
    this.subjectInsertedSource.next(item);
  }

  passUpdatedSubject(item) {
    this.subjectUpdatedSource.next(item);
  }

  passUpdatedTimetable(item) {
    this.timetableUpdatedSource.next(item);
  }

  passUpdatedSpeciality(item) {
    this.specialityUpdatedSource.next(item);
  }

  passInsertedSpeciality(item) {
    this.specialityInsertedSource.next(item);
  }

  passUpdatedFaculty(item) {
    this.facultySource.next(item);
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
    this.recordDeletedInDatabaseSource.next(item);
  }

  passErrorWhenDelete(err) {
    this.recordDeletedInDatabaseSource.error(err);
  }

  updateEntity(id: number, entity: string, dto: any): Observable<any> {
    return this.http.post(`/${entity}${url.update}/${id}`, dto);
  }

  deleteEntity(id: number, entity: string): Observable<any> {
    return this.http.get(`/${entity}${url.delete}/${id}`);
  }
}
