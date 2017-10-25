import {Component, OnInit} from '@angular/core';

import {TimeTableService} from '../shared/services/crud/time-table.service';
import {TimeTable} from '../shared/entities/time-table';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})

export class TimeTableComponent implements OnInit {
  timetables: TimeTable[];
  headingColumnsOfTable = ['№', 'Назва', 'Опис', 'Дата початку', 'Час початку', 'Дата закінчення', 'Час закінчення'];
  errWithDisplayingTimeTables: string;
  errWithCountingRecords: string;
  offset = 0;
  currentPage = 1;
  limitPerPage = 10;
  numberOfRecords: number;
  isLoading = false;

  constructor(private timeTableService: TimeTableService) {
  }

  goPage(n: number): void {
    this.offset = (this.limitPerPage * n) - this.limitPerPage;
    this.getTimeTables();
  }

  goPrev(): void {
    this.offset -= this.limitPerPage;
    this.getTimeTables();
  }

  goNext(): void {
    this.offset += this.limitPerPage;
    this.getTimeTables();
  }

  getTimeTables() {
    this.isLoading = true;
    this.timeTableService.getTimeTables(this.limitPerPage, this.offset).subscribe(data => {
        this.timetables = data;
        console.log(this.timetables);
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.errWithDisplayingTimeTables = 'Something is wrong with displaying data. Please try again.';
      });
  }

  countRecords(): void {
    this.timeTableService.countTimeTableRecords().subscribe((data) => {
        this.numberOfRecords = parseInt(data.numberOfRecords, 10);
      },
      err => {
        console.log(err);
        this.errWithCountingRecords = 'Something is wrong with displaying the number of timetable records';
      });
  }

  ngOnInit() {
    this.getTimeTables();
    this.countRecords();
  }
}
