import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog, PageEvent} from '@angular/material';

import {QuestionService} from './question.service';
import {Question} from './question';
import {InfoModalService} from '../../info-modal/info-modal.service';
import {QuestionAddModalComponent} from './add-question-modal/add-question-modal.component';
import {TestService} from '../test.service';

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
  testName: string;
  headingColumnsOfTable = ['№', 'Запитання', 'Рівень', 'Тип', 'Файл'];
  questionTypes: any[];
  numberOfRecords: number;
  btnAdd = 'Додати запитання';
  buttons = [{
    templateClass: 'fa-list',
    link: 'admin-area/answers'
  }];

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private infoModal: InfoModalService,
    private testService: TestService
  ) {
    this.questionTypes = ['Простий вибір', 'Мульти-вибір', 'Поле вводу', 'Числова'];
  }

  getQuestions(): void {
    this.questionService.getRecordsRangeByTest(this.testId, this.limit, this.offset).subscribe((data) => {
      if (data[0]) {
        this.questions = data[0];
        this.questions.forEach(question => {
          question.type = this.questionTypes[+question.type - 1];
          delete question.testId;
          if (question.attachment) { question.attachment = `<img src="${question.attachment}">`; }
        });
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      } else {
        this.infoModal.openInfoDialog('Увага', 'На даний момент тут немає записів.');
      }
    },
    err => this.infoModal.openErrorDialog('Не вдалось завантажити дані з сервера. Спробуйте, будь ласка, пізніше!'));
  }

  getTestName(): void {
    this.testService.getTest(this.testId).subscribe(test => {
      this.testName = test[0].testName;
    });
  }

  openQuestionAddModal(): void {
    const dialogRef = this.dialog.open(QuestionAddModalComponent, {
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
      this.getTestName();
    });
  }
}
