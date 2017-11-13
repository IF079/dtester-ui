import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Subject} from './subject';
import {SubjectDto} from './subject-dto';
import {RecordsCount} from '../shared/entities/recordsCount';
import {url} from '../shared/constants/url-constants';

@Injectable()

export class SubjectService {
  constructor(private http: HttpClient) {
  }

  getSubjects(): Observable<[Subject[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<SubjectDto[]>(`${url.subjectUrl}${url.getRecords}`)
        .map(subjectDtoArr => subjectDtoArr.map(subjectDto => new Subject(subjectDto))),
      this.http.get<RecordsCount>(`${url.subjectUrl}${url.getCount}`)
    );
  }

  getSubjectsRange(limit: number, offset: number): Observable<[Subject[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<SubjectDto[]>(`${url.subjectUrl}${url.getRecordsRange}/${limit}/${offset}`)
        .map(subjectDtoArr => subjectDtoArr.map(subjectDto => new Subject(subjectDto))),
      this.http.get<RecordsCount>(`${url.subjectUrl}${url.getCount}`)
    );
  }

  getSubject(id: number): Observable<Subject[]> {
    return this.http.get<SubjectDto[]>(`${url.subjectUrl}${url.getRecords}${id}`)
      .map(subjectDtoArr => subjectDtoArr.map(subjectDto => new Subject(subjectDto)));
  }

  addSubject(subject: SubjectDto): Observable<SubjectDto> {
    return this.http.post<SubjectDto>(`${url.subjectUrl}${url.insertData}`, subject);
  }
}
