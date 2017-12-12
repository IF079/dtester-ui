import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material';

import {TestDetailService} from './test-detail.service';
import {TestDetail} from './test-detail';
import {generalConst} from '../../shared/constants/general-constants';
import {AddTestDetailModalComponent} from './add-test-detail-modal/add-test-detail-modal.component';
import {TestService} from '../test.service';

@Component({
  selector: 'dtest-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.scss']
})
export class TestDetailComponent implements OnInit {
  limit = 100;
  testDetails: TestDetail[];
  numberOfRecords: number;
  testId: number;
  testName: string;
  maxPoints = 0;
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
  ) {
  }

  getTestDetails(): void {
    this.testDetailService.getTestDetailsByTestId(this.testId).subscribe(data => {
      this.testDetails = data;
      this.testDetails.forEach(detail => {
        delete detail.testId;
        this.levels.push(detail.level);
        this.maxPoints += detail.tasks * detail.rate;
      });
    },
    err => {
      this.errWithDisplayingStudents = generalConst.errorWithDisplayData;
    });
  }

  getTestName(): void {
    this.testService.getTest(this.testId).subscribe(test => {
      this.testName = test[0].testName;
    });
  }

  openTestDetailModal(): void {
    this.testService.getTest(this.testId).subscribe(test => {
      this.testDetailService.getTestDetailsByTestId(this.testId).subscribe(details => {
        details.forEach(detail => {
          this.nowTasks += +detail.tasks;
        });
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
          this.nowTasks = 0;
        });
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
      this.getTestName();
    });
  }
}
