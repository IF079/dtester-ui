import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubjectService} from '../subject/subject.service';
import {TestPlayerService} from './test-player.service';
import {TestDetailService} from '../test-detail/test-detail.service';
import {Question} from '../test/question/question';
import {Answer} from '../test/answer/answer';
import {TestDetail} from '../test-detail/test-detail';
import {Test} from '../test/test';
import {TestService} from '../test/test.service';
import {generalConst} from '../shared/constants/general-constants';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'dtester-test-player',
  templateUrl: 'test-player.component.html', styleUrls: ['test-player.component.scss']
})

export class TestPlayerComponent implements OnInit {
  testDuration: number;
  test_id: number;
  test: Test;
  questions: Question[] = [];
  question: Question;
  start: boolean;
  finish: boolean;
  user_id: number;
  test_details: TestDetail[] = [];
  answers: Answer[];
  errWithDisplaying: string;
  testName: string;
  seconds: number;
  startunixTime: number;
  endUnixTime: number;
  unixTimeLeft: number;
  currentUnixTime: number;
  minutesDisplay: string;
  secondsDisplay: string;
  ticks: number;
  MILLISECONDS_IN_MINUTE: number;
  timer: any;
  timerForDisplay: any;
  currentAnswer: Array<string> = [];
  statusTimer: string;
  PERSENT: number;
  DANGER_COLOR: string;
  STATUS_COLOR: string;
  DANGER_STATUS: number;
  availability: any;


  NEXT_QUESTION = 'Наступне питання';
  ENTER_ANSWER = 'Ввести відповідь';
  MARKED = 'Marked for review';
  FINISH = 'Завершити тест';
  START = 'Почати тест';
  QUESTION = 'Питання №';
  SAVE_ANSWER = 'Зберети відповідь';
  RESULTS = 'Зверегти результати';
  FINISH_DIALOG = 'Тест завершено';


  constructor(private router: Router,
              private subjectService: SubjectService,
              private route: ActivatedRoute,
              private testService: TestService,
              private test_player: TestPlayerService,
              private test_detail: TestDetailService) {


    this.seconds = 60;
    this.ticks = 0;
    this.minutesDisplay = '00';
    this.secondsDisplay = '00';
    this.MILLISECONDS_IN_MINUTE = 1000;
    this.PERSENT = 100;
    this.STATUS_COLOR = '#51E000';
    this.DANGER_COLOR = '#FD040E';
    this.DANGER_STATUS = 18;


  }

  ngOnInit() {
    this.test_id = this.route.snapshot.queryParams['testId'] || 1;
    this.user_id = this.route.snapshot.queryParams['user_id'];
    this.testDuration = +this.route.snapshot.queryParams['test_duration'] * this.seconds;
    this.getTestDetails();
    this.testService.getTestsBySubjectId(this.test_id)
      .subscribe(
        resp => this.testName = resp[0]['test_name'],
        err => {
          this.errWithDisplaying = generalConst.errorWithDisplayData;
        });

  }

  getTestDetails() {
    this.test_detail.getTestDetail(this.test_id).subscribe(resp => {
      this.test_details = resp;
    }, err => {
      this.errWithDisplaying = generalConst.errorWithDisplayData;
    });
  }


  startTest() {
    this.test_player.checkSecurity(this.user_id, this.test_id).subscribe(resp => console.log(resp));
    this.getTime();
    this.start = true;
    if (this.start) {
      this.startTimer();


      const answers$ = this.test_player.getQuestions(this.test_details).do(resp => {
        this.questions = resp;
        this.question = resp[0];
      })
        .switchMap(resp => this.test_player.getAnswers(resp));

      answers$.subscribe(response => {
        this.questions['answers'] = response;
      }, err => {
        this.errWithDisplaying = generalConst.errorWithDisplayData;
      });
    } else {

    }
  }

  next() {
    const currentIndex = this.questions.indexOf(this.question);
    const newIndex = currentIndex === this.questions.length - 1 ? 0 : currentIndex + 1;
    this.question = this.questions[newIndex];
  }

  goToAnswers(number: number) {
    this.question = this.questions[number - 1];
  }

  finishTest() {
    /*this.modalService.openSuccessDialog('Tест завершено', () => {

    });
    this.test_player.resetSessionData().subscribe(err => {
      this.errWithDisplaying = generalConst.errorWithDisplayData;
    });*/
  }

  getTime() {
    this.test_player.getCurrentTime()
      .subscribe(res => {
        this.startunixTime = +res['unix_timestamp'];
        this.endUnixTime = this.startunixTime + this.testDuration;
        this.unixTimeLeft = this.testDuration;
        this.startTimer();
      });
  }


  startTimer() {
    this.test_player.getCurrentTime()
      .subscribe(res => {
          this.currentUnixTime = +res['unix_timestamp'];
          this.showTimer();
        },
        err => {
          this.errWithDisplaying = generalConst.errorWithDisplayData;
        });
  }

  private showTimer() {
    const timer = setInterval(() => {
      if (this.unixTimeLeft > 0) {
        this.secondsDisplay = this.digitizeTime(Math.floor(this.unixTimeLeft % 60)).toString();
        this.statusTimer = Math.floor(this.unixTimeLeft / (this.testDuration / this.PERSENT)) + '%';
        this.minutesDisplay = this.digitizeTime(Math.floor(this.unixTimeLeft / 60)).toString();
        this.unixTimeLeft--;
      } else {
        /*this.modalService.openSuccessDialog('Час завершився', () => {

        });*/
        clearInterval(timer);
        this.finishTest();
        this.stopTimer();
      }
    }, this.MILLISECONDS_IN_MINUTE);
  }

  checkUnixTime() {
    this.test_player.getCurrentTime()
      .subscribe(res => {
        if (+res['unix_timestamp'] < this.endUnixTime) {
          this.unixTimeLeft = (this.endUnixTime - +res['unix_timestamp']);
        } else if (+res['unix_timestamp'] > this.endUnixTime) {
        }
      });
  }

  getArrayOfNumbers(array: Question[]) {
    const ArrayOfNumbers = [];
    for (let j = 1; j <= array.length; j++) {
      ArrayOfNumbers.push(j);
    }
    return ArrayOfNumbers;
  }

  stopTimer() {
    clearInterval(this.timer);
  };

  digitizeTime(value: any) {
    return value <= 9 ? '0' + value : value;
  };

  checkProgresColor() {
    const status = parseInt(this.statusTimer, 0);
    if (status > this.DANGER_STATUS) {
      return this.STATUS_COLOR;
    } else if (status <= this.DANGER_STATUS) {
      return this.DANGER_COLOR;
    }
  };

}
