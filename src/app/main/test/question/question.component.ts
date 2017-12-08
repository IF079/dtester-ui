import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog, MatPaginatorIntl, PageEvent} from '@angular/material';

import {QuestionService} from './question.service';
import {Question} from './question';
import {generalConst} from '../../shared/constants/general-constants';
import {InfoModalService} from '../../info-modal/info-modal.service';
import {QuestionAddModalComponent} from './question-add-modal/question-add-modal.component';

@Component({
  selector: 'dtest-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  limit = 10;
  offset = 0;
  pageSizeOptions = [5, 10, 25, 100];
  questions: Question[];
  question: Question;
  testId: number;
  headingColumnsOfTable = ['№', 'Запитання', 'Рівень', 'Тип'];
  questionTypes: any[];
  numberOfRecords: number;
  btnAdd = 'Додати запитання';
  buttons = [{
    templateClass: 'fa-list',
    link: '/answers'
  }];

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private infoModal: InfoModalService
  ) {
    this.questionTypes = ['Простий вибір', 'Мульти-вибір', 'Поле вводу'];
  }

  getQuestions(): void {
    this.questionService.getRecordsRangeByTest(this.testId, this.limit, this.offset, 'wi').subscribe((data) => {
      if (data[0]) {
        this.questions = data[0];
        this.questions.forEach(question => {
          question.type = this.questionTypes[question.type - 1];
          delete question.testId;
          delete question.attachment;
        });
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      } else {
        this.infoModal.openInfoDialog('Увага', 'На даний момент тут немає записів.');
      }
    },
    err => this.infoModal.openErrorDialog('Не вдалось завантажити дані з сервера. Спробуйте, будь ласка, пізніше!'));
  }

  openQuestionAddModal(): void {
    const dialogRef = this.dialog.open(QuestionAddModalComponent, {
      width: '400px',
      data: {
        testId: this.testId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  goPage(pageEvent: PageEvent) {
    this.limit = pageEvent.pageSize;
    this.offset = ((pageEvent.pageIndex + 1) * pageEvent.pageSize) - pageEvent.pageSize;
    this.getQuestions();
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.testId = +params.get('testId');
      this.getQuestions();
    });
  }

}
