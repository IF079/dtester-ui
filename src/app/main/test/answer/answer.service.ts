import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Answer} from './answer';
import {AnswerDto} from './answer-dto';
import {RecordsCount} from '../../shared/entities/recordsCount';
import {url} from '../../shared/constants/url-constants';

@Injectable()
export class AnswerService {

  constructor(private http: HttpClient) {
  }

  getAnswer(id: number): Observable<Answer[]> {
    return this.http.get<AnswerDto[]>(`${url.answerUrl}${url.getRecords}/${id}`)
      .map( answerDtoArr => answerDtoArr.map( answerDto => new Answer(answerDto) ) );
  }

  getAnswers(): Observable<[Answer[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<AnswerDto[]>(`${url.answerUrl}${url.getRecords}`)
        .map( answerDtoArr => answerDtoArr.map( answerDto => new Answer(answerDto) ) ),
      this.http.get<RecordsCount>(`${url.answerUrl}${url.getCount}`)
    );
  }

  getAnswersByQuestionId(questionId: number): Observable<Answer[]> {
    return this.http.get<any>(`${url.answerUrl}${url.getAnswersByQuestion}/${questionId}`)
      .map( answerDtoArr => {
        if (answerDtoArr.response !== 'no records') {
          return answerDtoArr.map( answerDto => new Answer(answerDto));
        }
    });
  }

  setAnswer(answer: Answer): Observable<any> {
    return this.http.post(`${url.answerUrl}${url.insertData}`, new AnswerDto(answer));
  }
}
