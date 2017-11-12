import {Component, OnInit} from '@angular/core';
import {MatDialog, MatPaginatorIntl, PageEvent} from '@angular/material';

import {TimeTableService} from './time-table.service';
import {TimeTable} from './time-table';
import {generalConst} from '../shared/constants/general-constants';
import {MatPaginatorIntlUkr} from '../shared/entities/custom-mat-paginator';
import {TimeTableModalComponent} from './timetable-modal/time-table-modal.component';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MatPaginatorIntlUkr}]
})

export class TimeTableComponent implements OnInit {
  limit = 10;
  offset = 0;
  pageSizeOptions = [5, 10, 25, 100];
  timetables: TimeTable[];
  headingColumnsOfTable = ['№', 'Назва групи', 'Назва предмету', 'Дата початку', 'Час початку', 'Дата закінчення', 'Час закінчення'];
  errWithDisplayingTimeTables: string;
  numberOfRecords: number;
  subjectDictionary = {};
  groupDictionary = {};
  btnAdd = 'Додати розклад';

  constructor(private timeTableService: TimeTableService, public dialog: MatDialog) {
  }


  openDialog() {
    const dialogRef = this.dialog.open(TimeTableModalComponent, {
      height: '350px',
      width: '1000px',
      data: {groupDictionary: this.groupDictionary, subjectDictionary: this.subjectDictionary}
    });
  }

  goPage(pageEvent: PageEvent) {
    this.limit = pageEvent.pageSize;
    this.offset = ((pageEvent.pageIndex + 1) * pageEvent.pageSize) - pageEvent.pageSize;
    this.getTimeTables();
  }

  getTimeTables() {
    this.timeTableService.getTimeTablesRange(this.limit, this.offset).subscribe(data => {
        this.timetables = data[0];
        data[1].forEach(item => this.groupDictionary[item.group_id] = item.group_name);
        data[2].forEach(item => this.subjectDictionary[item.id] = item.name);
        this.timetables.forEach((item) => {
          item.group_id = this.groupDictionary[item.group_id];
          item.subject_id = this.subjectDictionary[item.subject_id];
        });
        this.numberOfRecords = parseInt(data[3].numberOfRecords, 10);
      },
      err => {
        this.errWithDisplayingTimeTables = generalConst.errorWithDisplayData;
      });
  }

  ngOnInit() {
    this.getTimeTables();
  }
}
