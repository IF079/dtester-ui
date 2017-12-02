import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Subject} from '../../subject/subject';
import {SubjectDto} from '../../subject/subject-dto';
import {TimeTable} from '../time-table';
import {RecordsCount} from '../../shared/entities/recordsCount';
import {url} from '../../shared/constants/url-constants';
import {Group} from '../../groups/group';

@Injectable()

export class TimeTableService {
  constructor(private http: HttpClient) {
  }


  getTimeTablesRange(limit: number, offset: number): Observable<[TimeTable[], Group[], Subject[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<TimeTable[]>(`${url.timeTableUrl}${url.getRecordsRange}/${limit}/${offset}`),
      this.http.get<Group[]>(`${url.groupUrl}${url.getRecords}`),
      this.http.get<SubjectDto[]>(`${url.subjectUrl}${url.getRecords}`)
        .map(subjectDtoArr => subjectDtoArr.map(subjectDto => new Subject(subjectDto))),
      this.http.get<RecordsCount>(`${url.timeTableUrl}${url.getCount}`),
    );
  }

  getGroupsAndSubjects(): Observable<[Group[], Subject[]]> {
    return Observable.forkJoin(
      this.http.get<Group[]>(`${url.groupUrl}${url.getRecords}`),
      this.http.get<SubjectDto[]>(`${url.subjectUrl}${url.getRecords}`)
        .map(subjectDtoArr => subjectDtoArr.map(subjectDto => new Subject(subjectDto)))
    );
  }

  addTimeTable(data): Observable<any> {
    return this.http.post(`${url.timeTableUrl}${url.insertData}`, data);
  }
}
