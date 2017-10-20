import {Component, OnInit} from '@angular/core';
import {TimeTableService} from '../../shared/services/time-table.service';
import {TimeTable} from '../../shared/entities/time-table';


@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss'],
  providers: [
    TimeTableService
  ]
})
export class TimeTableComponent implements OnInit {

  timetables: TimeTable[];
  displayedColumns = ['Id:', 'Група', 'Предмет', 'Дата початку', 'Час початку', 'Дата закінчення', 'Час закінчення', '', ''];

  constructor(private timeTableService: TimeTableService ){ }
  ngOnInit() {

    this.timeTableService.getTimeTables().subscribe(data => {
      this.timetables = data;
      console.log(this.timetables);
    });
  }
}
