import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog, MatPaginatorIntl, PageEvent} from '@angular/material';

import {AnswerService} from './answer.service';
import {Answer} from './answer';
import {generalConst} from '../../shared/constants/general-constants';
import {InfoModalService} from '../../info-modal/info-modal.service';
import {AddAnswerModalComponent} from './add-answer-modal/add-answer-modal.component';


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
  headingColumnsOfTable = ['№', 'Статус', 'Текст'];
  numberOfRecords: number;
  btnAdd = 'Добавити відповідь';
  answerStatuss = [];

  constructor(
    private answerService: AnswerService,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private infoModal: InfoModalService
  ) {
    this.answerStatuss = ['Неправильна', 'Правильна']
  }

  getAnswers(): void {
    this.answerService.getAnswersByQuestionId(this.questionId).subscribe(data => {
      if (data) {
        this.answers = data;
        this.answers.forEach(answer => {
          delete answer.questionId;
          delete answer.attachment;
          answer.trueAnswer = this.answerStatuss[answer.trueAnswer];
        });
      } else {
        this.infoModal.openInfoDialog('Увага', 'На даний момент тут немає записів.');
      }
    },
    err => this.infoModal.openErrorDialog('Не вдалось завантажити дані з сервера. Спробуйте, будь ласка, пізніше!'));
  }

  openAddAnswerModal(): void {
    const dialogRef = this.dialog.open(AddAnswerModalComponent, {
      width: '400px',
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
    });
  }

}
