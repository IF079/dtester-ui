import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Subject} from './subject';
import {SubjectDto} from './subject-dto';
import {RecordsCount} from '../shared/entities/recordsCount';
import {urlConstants} from '../shared/constants/url-constants';
import {TestPlayerComponent} from "../test-player/test-player.component";

@Injectable()

export class SubjectService {
  constructor(private http: HttpClient) {
  }


  getSubjects(limit: number, offset: number): Observable<[Subject[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<SubjectDto[]>(`${urlConstants.subjectUrl}${urlConstants.getRecordsRange}/${limit}/${offset}`)
        .map(subjectDtoArr => subjectDtoArr.map(subjectDto => new Subject(subjectDto))),
      this.http.get<RecordsCount>(`${urlConstants.subjectUrl}${urlConstants.getCount}`)
    );
  }

  getSubject(id: number): Observable<Subject[]> {
    return this.http.get<SubjectDto[]>(`${urlConstants.subjectUrl}${urlConstants.getRecords}${id}`)
      .map(subjectDtoArr => subjectDtoArr.map(subjectDto => new Subject(subjectDto)));
  }

  addSubject(subject: any): Observable<SubjectDto> {
    return this.http.post(`${urlConstants.subjectUrl}${urlConstants.insertData}`, subject);
  }
}
