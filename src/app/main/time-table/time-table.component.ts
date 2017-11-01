import {Component, OnInit} from '@angular/core';

import {TimeTableService} from './time-table.service';
import {TimeTable} from './time-table';
import {generalConst} from '../shared/constants/general-constants';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})

export class TimeTableComponent implements OnInit {
  timetables: TimeTable[];
  headingColumnsOfTable = ['№', 'Назва', 'Опис', 'Дата початку', 'Час початку', 'Дата закінчення', 'Час закінчення', '', ''];
  errWithDisplayingTimeTables: string;
  numberOfRecords: number;

  constructor(private timeTableService: TimeTableService) {
  }

  getTimeTables() {
    this.timeTableService.getTimeTables(10, 0).subscribe(data => {
        this.timetables = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      },
      err => {
        this.errWithDisplayingTimeTables = generalConst.errorWithDisplayData;
      });
  }

  ngOnInit() {
    this.getTimeTables();
  }
}
