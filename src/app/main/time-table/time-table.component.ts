import {Component, OnInit} from '@angular/core';
import {MatDialog, MatPaginatorIntl, PageEvent} from '@angular/material';

import {TimeTableService} from './time-table.service';
import {TimeTable} from './time-table';
import {generalConst} from '../shared/constants/general-constants';
import {MatPaginatorIntlUkr} from '../shared/entities/custom-mat-paginator';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlUkr}]
})

export class TimeTableComponent implements OnInit {
  limit = 10;
  offset = 0;
  pageSizeOptions = [5, 10, 25, 100];
  timetables: TimeTable[];
  headingColumnsOfTable = ['№', 'Назва', 'Опис', 'Дата початку', 'Час початку', 'Дата закінчення', 'Час закінчення'];
  errWithDisplayingTimeTables: string;
  numberOfRecords: number;

  constructor(private timeTableService: TimeTableService) {
  }

  goPage(pageEvent: PageEvent) {
    this.limit = pageEvent.pageSize;
    this.offset = ((pageEvent.pageIndex + 1) * pageEvent.pageSize) - pageEvent.pageSize;
    this.getTimeTables();
  }

  getTimeTables() {
    this.timeTableService.getTimeTables(this.limit, this.offset).subscribe(data => {
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
