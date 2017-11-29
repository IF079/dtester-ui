import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {TestDetail} from './test-detail';
import {TestDetailDto} from './test-detail-dto';
import {RecordsCount} from '../shared/entities/recordsCount';
import {url} from '../shared/constants/url-constants';

@Injectable()

export class TestDetailService {
  constructor(private http: HttpClient) {
  }

  getTestDetails(): Observable<[TestDetail[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<TestDetailDto[]>(`${url.testDetailUrl}${url.getRecords}`)
        .map( testDetailDtoArr => testDetailDtoArr.map( testDetailDto => new TestDetail(testDetailDto))),
      this.http.get<RecordsCount>(`${url.testDetailUrl}${url.getCount}`)
    );
  }

  getTestDetailsRange(limit: number, offset: number): Observable<[TestDetail[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<TestDetailDto[]>(`${url.testDetailUrl}${url.getRecordsRange}/${limit}/${offset}`)
        .map( testDetailDtoArr => testDetailDtoArr.map( testDetailDto => new TestDetail(testDetailDto))),
      this.http.get<RecordsCount>(`${url.testDetailUrl}${url.getCount}`)
    );
  }

  getTestDetailsByTestId(testId: number): Observable<TestDetail[]> {
    return this.http.get<TestDetailDto[]>(`${url.testDetailUrl}${url.getTestDetailsByTest}/${testId}`)
      .map( testDetailDtoArr => testDetailDtoArr.map( testDetailDto => new TestDetail(testDetailDto)));
  }

  getTestDetail(id: number): Observable<TestDetail[]> {
    return this.http.get<TestDetailDto[]>(`${url.testDetailUrl}${url.getRecords}/${id}`)
      .map( testDetailDtoArr => testDetailDtoArr.map( testDetailDto => new TestDetail(testDetailDto)));
  }

  addTestDetail(testDetail: TestDetail): Observable<any> {
    return this.http.post(`${url.testDetailUrl}${url.insertData}`, new TestDetailDto(testDetail));
  }
}
