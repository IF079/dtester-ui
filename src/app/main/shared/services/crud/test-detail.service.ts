import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {TestDetail} from '../../entities/test-detail';
import {TestDetailDto} from '../crud/dto/test-detail-dto';
import {RecordsCount} from '../../entities/recordsCount';
import {LoggerFactory} from '../../../../shared/logger/logger.factory';
import {urlConstants} from '../../constants/url-constants';

@Injectable()

export class TestDetailService {
  constructor(private http: HttpClient) {
  }

  getTestDetails(limit: number, offset: number): Observable<[TestDetail[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<TestDetailDto[]>(`${urlConstants.testDetailUrl}${urlConstants.getRecordsRange}/${limit}/${offset}`)
        .map( testDetailDtoArr => testDetailDtoArr.map( testDetailDto => new TestDetail(testDetailDto))),
      this.http.get<RecordsCount>(`${urlConstants.testDetailUrl}${urlConstants.getCount}`)
    );
  }

  getTestDetail(id: number): Observable<TestDetail[]> {
    return this.http.get<TestDetailDto[]>(`${urlConstants.testDetailUrl}${urlConstants.getRecords}/${id}`)
      .map( testDetailDtoArr => testDetailDtoArr.map( testDetailDto => new TestDetail(testDetailDto)));
  }

  addTestDetail(testDetail: TestDetail): Observable<any> {
    return this.http.post(`${urlConstants.testUrl}${urlConstants.getRecords}`, new TestDetailDto(testDetail));
  }
}
