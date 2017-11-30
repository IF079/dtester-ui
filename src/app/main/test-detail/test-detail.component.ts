import {Component} from '@angular/core';

import {TestDetailService} from './test-detail.service';
import {TestDetail} from './test-detail';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {generalConst} from '../shared/constants/general-constants';

@Component({
  selector: 'dtest-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.scss']
})
export class TestDetailComponent {
  log = LoggerFactory.create(TestDetailComponent);
  testDetails: TestDetail[];
  testDetail: TestDetail;
  numberOfRecords: number;
  errWithDisplayingStudents: string;

  constructor(private testDetailService: TestDetailService) {
  }

  getTestDetails(): void {
    this.testDetailService.getTestDetails().subscribe(data => {
      this.testDetails = data[0];
      this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
    },
    err => {
      this.log.error(err);
      this.errWithDisplayingStudents = generalConst.errorWithDisplayData;
    });
  }

  getTestDetailsRange(): void {
    this.testDetailService.getTestDetailsRange(5, 1).subscribe(data => {
      this.testDetails = data[0];
      this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
    },
    err => {
      this.log.error(err);
      this.errWithDisplayingStudents = generalConst.errorWithDisplayData;
    });
  }
}


