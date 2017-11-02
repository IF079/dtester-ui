import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Test} from './test';
import {TestDto} from './test-dto';
import {RecordsCount} from '../shared/entities/recordsCount';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {urlConstants} from '../shared/constants/url-constants';

@Injectable()

export class TestService {
  constructor(private http: HttpClient) {
  }

  getTests(): Observable<[Test[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<TestDto[]>(`${urlConstants.testUrl}${urlConstants.getRecords}`)
        .map( testDtoArr => testDtoArr.map( testDto => new Test(testDto))),
      this.http.get<RecordsCount>(`${urlConstants.testUrl}${urlConstants.getCount}`)
    );
  }

  getTestsRange(limit: number, offset: number): Observable<[Test[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<TestDto[]>(`${urlConstants.testUrl}${urlConstants.getRecordsRange}/${limit}/${offset}`)
        .map( testDtoArr => testDtoArr.map( testDto => new Test(testDto))),
      this.http.get<RecordsCount>(`${urlConstants.testUrl}${urlConstants.getCount}`)
    );
  }

  getTestsBySubjectId(subjectId: number): Observable<Test[]>{
    return this.http.get<TestDto[]>(`${urlConstants.testUrl}${urlConstants.getTestsBySubject}/${subjectId}`)
      .map( testDtoArr => testDtoArr.map( testDto => new Test(testDto)));
  }

  getTest(id: number): Observable<Test[]> {
    return this.http.get<TestDto[]>(`${urlConstants.testUrl}${urlConstants.getRecords}/${id}`)
      .map( testDtoArr => testDtoArr.map( testDto => new Test(testDto)));
  }

  addTest(test: Test): Observable<any> {
    return this.http.post(`${urlConstants.testUrl}${urlConstants.insertData}`, new TestDto(test));
  }
}
