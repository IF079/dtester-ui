import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

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



  getSubjects(): void {
    this.subjectService.getSubjects(20, 15).subscribe((data) => {
        this.subjects = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      },
      err => {
        log.error(err);
        this.errWithDisplayingSubjects = generalConst.errorWithDisplayData;
      });
  }

  ngOnInit() {
    this.getSubjects();
  }
}

const log = LoggerFactory.create(SubjectComponent);
