import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, PageEvent} from '@angular/material';

import {SubjectModalComponent} from './subject-modal/subject-modal.component';
import {SubjectService} from './subject.service';
import {Subject} from './subject';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {generalConst} from '../shared/constants/general-constants';


@Component({
  selector: 'app-subjects',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})

export class SubjectComponent implements OnInit {
  limit = 10;
  offset = 0;
  pageSizeOptions = [5, 10, 25, 100];
  headingColumnsOfTable = ['№', 'Назва', 'Опис', '', ''];
  btnAdd = 'Додати предмет';
  subjects: Subject[];
  errWithDisplayingSubjects: string;
  numberOfRecords: number;

  constructor(private subjectService: SubjectService, public dialog: MatDialog) {

  }

  openDialog() {
    const dialogRef = this.dialog.open(SubjectModalComponent, {
      height: '350px',
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  goPage(pageEvent: PageEvent) {
    this.limit = pageEvent.pageSize;
    this.offset = ((pageEvent.pageIndex + 1) * pageEvent.pageSize) - pageEvent.pageSize;
    this.getSubjects();
  }

  getSubjects(): void {
    this.subjectService.getSubjects(this.limit, this.offset).subscribe((data) => {
        this.subjects = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      },
      err => {

        this.errWithDisplayingSubjects = generalConst.errorWithDisplayData;
      });
  }

  ngOnInit() {
    this.getSubjects();
  }
}



