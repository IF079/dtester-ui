import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Question} from "../shared/entities/question";
import {Answer} from "../shared/entities/answer";
import {
  HOST, HOST_PROTOCOL, TEST_PLAYER_GET_ANSWER_BY_QUESTION,
  TEST_PLAYER_GET_QUESTIONS_IDS_BY_LEVEL_RAND,
  TEST_PLAYER_GET_TEST_DETAILS_BY_TEST,
  TEST_PLAYER_GET_TIME_STAMP, TEST_PLAYER_RESET_SESSION_DATA, TEST_PLAYER_SANSWER, TEST_PLAYER_START_TEST
} from '../shared/constants/url-constants';


@Injectable()
export class TestPlayerService {
  questions: Question[] = [];
  answers: Answer[] = [];
  options: RequestOptions;


  constructor(private http: Http,
              private router: Router) {
  };

  private handleError = (error: any) => {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if (error.status === 403) {
      sessionStorage.removeItem('userRole');
      this.router.navigate(['/login']);
    }
    return Observable.throw(errMsg);
  };


  getCurrentTime() {
    return this.http.get(HOST_PROTOCOL + HOST + TEST_PLAYER_GET_TIME_STAMP).map(resp => resp.json()).catch(this.handleError);
  }

  getQuestionsByLevelRandom(test_id: number, level: number, number: number) {
    return this.http.get(HOST_PROTOCOL + HOST + TEST_PLAYER_GET_QUESTIONS_IDS_BY_LEVEL_RAND + test_id + '/' + level + '/' + number).map(resp => resp.json()).catch(this.handleError);
  }

  getTestDetail(test_id: number) {
    return this.http.get(HOST_PROTOCOL + HOST + TEST_PLAYER_GET_TEST_DETAILS_BY_TEST + test_id).map(resp => resp.json()).catch(this.handleError);
  }

  getAnswersById(id: number): Observable<any> {
    return this.http.get(HOST_PROTOCOL + HOST + TEST_PLAYER_SANSWER + TEST_PLAYER_GET_ANSWER_BY_QUESTION + id).map(resp => resp.json()).catch(this.handleError);
  }

  getQuestions(testDetails: any[]) {
    this.questions = [];
    let forkJoinBatch: Observable<any>[] = testDetails.map(item => {
      return this.getQuestionsByLevelRandom(item.test_id, item.level, item.tasks);
    });
    return Observable.forkJoin(forkJoinBatch)
      .map((questions: Question[][] | any) => {
        this.questions = this.prepareQuestionForTest(<Question[][]>questions);
        return this.questions;
      }).catch(this.handleError);

  };

  prepareQuestionForTest(questions: Question[][]): Question[] {
    let tempArr: Question[] = [];

    questions.forEach((elem: Question[]) => {
      tempArr.push(...elem);
    });
    return tempArr.map((question: Question) => {
      return question;
    });
  }

  getAnswers(questions: Question[]) {
    let forkJoinBatch: Observable<any>[] = questions.filter(item => item['type'].toString() !== '3')
      .map(question => {
        return this.getAnswersById(question['question_id']);
      });

    return Observable.forkJoin(forkJoinBatch)
      .do((answers: Answer[][] | any) => {
        answers.map((answer, i) => {
          questions[i]['answers'] = answer;
        });
      }).catch(this.handleError);
  }

  resetSessionData() {
    return this.http.get(HOST_PROTOCOL + HOST + TEST_PLAYER_RESET_SESSION_DATA).map(resp => resp.json()).catch(this.handleError);
  }

  checkSecurity(user_id: number, test_id: number) {
    let body = JSON.stringify({'user_id': user_id, 'test_id': test_id});
    return this.http.post(HOST_PROTOCOL + HOST + TEST_PLAYER_START_TEST + user_id + '/' + test_id, JSON.stringify(body), this.options).map((resp: Response) => resp.json()).catch(this.handleError);
  }


}

