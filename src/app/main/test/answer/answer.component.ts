import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material';

import {AnswerService} from './answer.service';
import {Answer} from './answer';
import {InfoModalService} from '../../info-modal/info-modal.service';
import {AddAnswerModalComponent} from './add-answer-modal/add-answer-modal.component';
import {QuestionService} from '../question/question.service';


@Component({
  selector: 'dtest-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  limit = 10;
  offset = 0;
  pageSizeOptions = [5, 10, 25, 100];
  answers: Answer[];
  answer: Answer;
  questionId: number;
  questionText: string;
  headingColumnsOfTable = ['№', 'Статус', 'Текст'];
  numberOfRecords: number;
  btnAdd = 'Добавити відповідь';
  answerStatuses = [];

  constructor(
    private answerService: AnswerService,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private infoModal: InfoModalService,
    private questionService: QuestionService
  ) {
    this.answerStatuses = ['Неправильна', 'Правильна'];
  }

  getAnswers(): void {
    this.answerService.getAnswersByQuestionId(this.questionId).subscribe(data => {
      if (data) {
        this.answers = data;
        this.answers.forEach(answer => {
          delete answer.questionId;
          answer.trueAnswer = this.answerStatuses[answer.trueAnswer];
          if (answer.attachment) { answer.attachment = `<img src="${answer.attachment}">`; }
        });
      } else {
        this.infoModal.openInfoDialog('Увага', 'На даний момент тут немає записів.');
      }
    },
    err => this.infoModal.openErrorDialog('Не вдалось завантажити дані з сервера. Спробуйте, будь ласка, пізніше!'));
  }

  getQuestionText(): void {
    this.questionService.getQuestion(this.questionId).subscribe(question => {
      this.questionText = question[0].questionText;
    });
  }

  openAddAnswerModal(): void {
    const dialogRef = this.dialog.open(AddAnswerModalComponent, {
      data: {
        questionId: this.questionId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.questionId = +params.get('questionId');
      this.getAnswers();
      this.getQuestionText();
    });
  }
}
