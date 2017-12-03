import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Result} from './result';
import {ResultDto} from './result-dto';
import {RecordsCount} from '../../shared/entities/recordsCount';
import {url} from '../../shared/constants/url-constants';
import {Student} from '../../student/student-entity/student';
import {Test} from '../test';
import { StudentDto } from '../../student/student-entity/student-dto';
import { TestDto } from '../test-dto';

@Injectable()
export class ResultService {

  constructor(private http: HttpClient) {
  }

  getResults(): Observable<[Result[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<ResultDto[]>(`${url.resultUrl}${url.getRecords}`)
        .map(resultDtoArr => resultDtoArr.map(resultDto => new Result(resultDto))),
      this.http.get<RecordsCount>(`${url.resultUrl}${url.getCount}`)
    );
  }

  getStudentAndTest(studentId: number, testId: number): Observable<[Student[], Test[]]> {
    return Observable.forkJoin(
      this.http.get<StudentDto[]>(`${url.studentUrl}${url.getRecords}/${studentId}`)
        .map(studentDtoArr => studentDtoArr.map(studentArr => new Student(studentArr))),
      this.http.get<TestDto[]>(`${url.testUrl}${url.getRecords}/${testId}`)
        .map(testDtoArr => testDtoArr.map(testDto => new Test(testDto)))
    );
  }

}
