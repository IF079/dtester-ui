import {Component, OnInit} from '@angular/core';

import {TestService} from './test.service';
import {Test} from './test';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {generalConst} from '../shared/constants/general-constants';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  tests: Test[];
  test: Test;
  numberOfRecords: number;
  errWithDisplayingStudents: string;

  constructor(private testService: TestService) {
  }

  getTests(): void {
    this.testService.getTests().subscribe(data => {
      this.tests = data[0];
      this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      console.log(data[0]);
    },
    err => {
      log.error(err);
      this.errWithDisplayingStudents = generalConst.errorWithDisplayData;
    });
  }

  getTestsRange(): void {
    this.testService.getTestsRange(5, 0).subscribe(data => {
        this.tests = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords);
      },
      err => {
        log.error(err);
        this.errWithDisplayingStudents = generalConst.errorWithDisplayData;
      });
  }

  ngOnInit() {

  }

}

const log = LoggerFactory.create(TestComponent);
