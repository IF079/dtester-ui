import {Component, OnInit} from '@angular/core';

import {TestService} from '../shared/services/crud/test.service';
import {Test} from '../shared/entities/test';
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

  getTests() {
    this.testService.getTests(10, 0).subscribe(data => {
        this.tests = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      },
      err => {
        log.error(err);
        this.errWithDisplayingStudents = generalConst.errorWithDisplayData;
      });
  }

  ngOnInit() {
    this.getTests();
    this.testService.getTestsBySubject(1).subscribe(data => console.log(data));
  }

}

const log = LoggerFactory.create(TestComponent);
