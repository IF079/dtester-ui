import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubjectService} from '../subject/subject.service';
import {TestPlayerService} from './test-player.service';
import {TestDetailService} from '../test-detail/test-detail.service';

@Component({
  templateUrl: 'test-player.component.html',
  styleUrls: ['test-player.component.css']
})

export class TestPlayerComponent implements OnInit {


   testId: number;

  private navButtons: any[];

  private activeQuestion = 0;
  private questions: any[] = [];
  private tasksCount = 0;
  private questionCount = 0;
  private show = false;
  private testDetails: any[];
  private maxUserRate  = 0;

  constructor(private router: Router,
              private subjectService: SubjectService,
              private testPlayerService: TestPlayerService,
             private testDetailService: TestDetailService
             /* private modalService: NgbModal*/) {
  }

  ngOnInit() {
    this.testDetailService.getTestDetailsByTestId(this.testId)
      .subscribe(testDetails => {
        this.testDetails = testDetails;
        testDetails.forEach((data) => {
          this.tasksCount += +data.tasks;
          this.maxUserRate += +data.tasks * +data.rate;
        });
        testDetails.forEach((item) => {
          this.subjectService.getQuestionIdsByLevelRand(item.id, item.level, item.tasks)
              .subscribe(response => {              /*this.questionCount += +item.tasks;
              response.forEach(question => {
                question.chosenAnswer = {};
                question.rate = item.rate;
                this.questions.push(question);
              });*/
              if (this.questionCount === this.tasksCount) {
                this.questions.sort((a, b) => {
                  return Math.random() > 0.5 ? +a.question_id - +b.question_id : +b.question_id - +a.question_id;
                });
                this.navButtons = this.testPlayerService.createButtons(this.questions.length);
                this.questions.forEach((elem, j) => {
                  this.testPlayerService.getAnswersByQuestion(elem.question_id)
                    .subscribe(answers => {
                      answers.sort((a, b) => {
                        return Math.random() > 0.5 ? +a.answer_id - +b.answer_id : +b.answer_id - +a.answer_id;
                      });
                      elem.answers = answers;
                      if (j === this.questions.length - 1) {
                        this.show = true;
                      }
                    });
                });
              }
            });
        });
      });
  }
  skipQuestion(numberOfQuestion: number) {
    if (numberOfQuestion === this.questions.length) {
      for (let i = 0; i < this.navButtons.length; i++) {
        if (this.navButtons[i].answered === false) {
          this.changeActiveQuestion(i);
          break;
        }
      }
    } else {
      this.changeActiveQuestion(this.activeQuestion + 1);
    }
  }

  answerQuestion() {
    this.navButtons[this.activeQuestion].answered = true;
    const finishTest = this.navButtons.some((question) => {
      return question.answered === false;
    });
    if (!finishTest) {
      this.testPlayerService.checkSAnswers(this.questions)
        .subscribe(results => {
          const userRate = this.testPlayerService.getUserRate(results, this.questions);

        });
    } else {
      if (this.activeQuestion === this.questions.length - 1) {
        for (let i = 0; i < this.navButtons.length; i++) {
          if (this.navButtons[i].answered === false) {
            this.changeActiveQuestion(i);
            break;
          }
        }
      } else {
        this.changeActiveQuestion(this.activeQuestion + 1);
      }
    }
  }

  changeActiveQuestion(num: number) {
    if (num === this.activeQuestion) {
      return; }
      this.navButtons[this.activeQuestion].answered ?
      this.navButtons[this.activeQuestion].className = 'btn btn-success nom-qua' :
      this.navButtons[this.activeQuestion].className = 'btn btn-primary nom-qua';
    this.activeQuestion = num;
    this.navButtons[this.activeQuestion].className = 'btn btn-warning nom-qua';
  }

  toggleAnswer(event: any, answerId: number, numberOfQuestion: number) {
    this.questions[numberOfQuestion].chosenAnswer[answerId] = !this.questions[numberOfQuestion].chosenAnswer[answerId];
    event.stopImmediatePropagation();


  }

}
