import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material';

import {TestService} from './test.service';
import {Test} from './test';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {generalConst} from '../shared/constants/general-constants';
import {SubjectService} from '../subject/subject-service/subject.service';
import {TestModalComponent} from './add-test-modal/add-test-modal.component';
import {Subject} from '../subject/subject-classes/subject';
import {InfoModalService} from '../info-modal/info-modal.service';

@Component({
  selector: 'dtest-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  limit = 100;
  offset = 0;
  log = LoggerFactory.create(TestComponent);
  tests: Test[];
  test: Test;
  subjectId: number;
  numberOfRecords: number;
  errWithDisplayingStudents: string;
  headingColumnsOfTable = ['№', 'Назва', 'Кількість завдань', 'Час на виконання (хв)', 'Статус', 'Кількість спроб'];
  btnAdd = 'Додати тест';
  testStatus = [];
  buttons = [{
    templateClass: 'fa-list',
    link: '/questions'
  }];

  constructor(
    private testService: TestService,
    private route: ActivatedRoute,
    private location: Location,
    private subjectService: SubjectService,
    private dialog: MatDialog,
    private infoModal: InfoModalService
  ) {
    this.testStatus = ['Недоступний', 'Доступний'];
  }

  parseSubjects(subject: Subject[]): any[] {
    const localArr = [];
    subject.forEach(item => {
      localArr.push({
        value: item.id,
        text: item.name
      });
    });
    return localArr;
  }

  getTests(): void {
    this.testService.getTests().subscribe(data => {
        this.tests = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      },
      err => {
        this.log.error(err);
        this.errWithDisplayingStudents = generalConst.errorWithDisplayData;
      });
  }

  getTestsRange(): void {
    this.testService.getTestsRange(5, 0).subscribe(data => {
        this.tests = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      },
      err => {
        this.log.error(err);
        this.errWithDisplayingStudents = generalConst.errorWithDisplayData;
      });
  }

  getTestBySubjectId(id: number): void {
    this.testService.getTestsBySubjectId(id).subscribe(data => {
      if (data) {
        this.tests = data;
        this.tests.forEach(test => {
          delete test.subjectId;
          test.enabled = this.testStatus[test.enabled];
        });
      } else {
        this.infoModal.openInfoDialog('Увага', 'На даний момент тут немає записів.');
      }
    },
    err => this.infoModal.openErrorDialog('Не вдалось завантажити дані з сервера. Спробуйте, будь ласка, пізніше!'));
  }

  openTestModal(): void {
    const dialogRef = this.dialog.open(TestModalComponent, {
      width: '400px',
      data: {
        subjectId: this.subjectId
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
      this.subjectId = +params.get('subjectId');
      this.getTestBySubjectId(this.subjectId);
    });
  }

}
