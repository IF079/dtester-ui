import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Test} from './test';
import {TestDto} from './test-dto';
import {RecordsCount} from '../shared/entities/recordsCount';
import {url} from '../shared/constants/url-constants';

@Injectable()

export class TestService {
  constructor(private http: HttpClient) {
  }

  getTests(): Observable<[Test[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<TestDto[]>(`${url.testUrl}${url.getRecords}`)
        .map( testDtoArr => testDtoArr.map( testDto => new Test(testDto))),
      this.http.get<RecordsCount>(`${url.testUrl}${url.getCount}`)
    );
  }

  getTestsRange(limit: number, offset: number): Observable<[Test[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<TestDto[]>(`${url.testUrl}${url.getRecordsRange}/${limit}/${offset}`)
        .map( testDtoArr => testDtoArr.map( testDto => new Test(testDto))),
      this.http.get<RecordsCount>(`${url.testUrl}${url.getCount}`)
    );
  }

  getTestsBySubjectId(subjectId: number): Observable<Test[]> {
    return this.http.get<any>(`${url.testUrl}${url.getTestsBySubject}/${subjectId}`)
      .map( testDtoArr => {
        if (testDtoArr.response !== 'no records') {
          return testDtoArr.map( testDto => new Test(testDto));
        }
      });
  }

  getTest(id: number): Observable<Test[]> {
    return this.http.get<TestDto[]>(`${url.testUrl}${url.getRecords}/${id}`)
      .map( testDtoArr => testDtoArr.map( testDto => new Test(testDto)));
  }

  addTest(test: Test): Observable<any> {
    return this.http.post(`${url.testUrl}${url.insertData}`, new TestDto(test));
  }
}
