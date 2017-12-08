import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Question} from './question';
import {QuestionDto} from './question-dto';
import {RecordsCount} from '../../shared/entities/recordsCount';
import {url} from '../../shared/constants/url-constants';

@Injectable()
export class QuestionService {

  constructor(private http: HttpClient) {
  }

  getQuestion(id: number): Observable<Question[]> {
    return this.http.get<QuestionDto[]>(`${url.questionUrl}${url.getRecords}/${id}`)
      .map(questionDtoArr => questionDtoArr.map( questionDto => new Question(questionDto)));
  }

  setQuestion(question: Question): Observable<any> {
    return this.http.post(`${url.questionUrl}${url.insertData}`, new QuestionDto(question));
  }

  getQuestionIdsByLevelRand(testId: number, level: number, number: number): Observable<any> {
    return this.http.get(`${url.questionUrl}${url.getQuestionIdsByLevelRand}/${testId}/${level}/${number}`);
  }

  getRecordsRangeByTest(testId: number, limit: number, offset: number, wi?: string): Observable<[Question[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<any>(`${url.questionUrl}${url.getRecordsRangeByTest}/${testId}/${limit}/${offset}/`)
        .map(questionDtoArr => {
          if (questionDtoArr.response !== 'no records') {
            return questionDtoArr.map(questionDto => new Question(questionDto));
          }
        }),
      this.http.get<RecordsCount>(`${url.questionUrl}${url.countRecordsByTest}/${testId}`)
    );
  }

}
