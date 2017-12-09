import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material';

import {TestDetailService} from './test-detail.service';
import {TestDetail} from './test-detail';
import {generalConst} from '../../shared/constants/general-constants';
import {InfoModalService} from '../../info-modal/info-modal.service';
import {AddTestDetailModalComponent} from './add-test-detail-modal/add-test-detail-modal.component';
import {TestService} from '../test.service';

@Component({
  selector: 'dtest-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.scss']
})
export class TestDetailComponent implements OnInit {
  testDetails: TestDetail[];
  testDetail: TestDetail;
  numberOfRecords: number;
  testId: number;
  nowTasks = 0;
  levels = [];
  errWithDisplayingStudents: string;
  headingColumnsOfTable = ['№', 'Рівень', 'Кількість завдань', 'Кількість балів'];
  btnAdd = 'Додати деталі';

  constructor(
    private testDetailService: TestDetailService,
    private testService: TestService,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private infoModal: InfoModalService
  ) {
  }

  getTestDetails(): void {
    this.testDetailService.getTestDetailsByTestId(this.testId).subscribe(data => {
      this.testDetails = data;
      this.testDetails.forEach(detail => {
        delete detail.testId;
        this.nowTasks += +detail.tasks;
        this.levels.push(detail.level);
      });
    },
    err => {
      this.errWithDisplayingStudents = generalConst.errorWithDisplayData;
    });
  }

  getTestDetailsRange(): void {
    this.testDetailService.getTestDetailsRange(5, 1).subscribe(data => {
      this.testDetails = data[0];
      this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
    },
    err => {
      this.errWithDisplayingStudents = generalConst.errorWithDisplayData;
    });
  }

  openTestDetailModal(): void {
    this.testService.getTest(this.testId).subscribe(test => {
      const dialogRef = this.dialog.open(AddTestDetailModalComponent, {
        width: '400px',
        data: {
          testId: this.testId,
          maxTasks: test[0].tasks,
          nowTasks: this.nowTasks,
          levels: this.levels
        }
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.testId = +params.get('testId');
      this.getTestDetails();
    });
  }

}
