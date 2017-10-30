import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {SubjectModalComponent} from '../subject-modal/subject-modal.component';
import {SubjectService} from '../shared/services/crud/subject.service';
import {Subject} from '../shared/entities/subject';
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
  offset = 0;
  currentPage = 1;
  limitPerPage = 10;
  numberOfRecords: number;
  isLoading = false;

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

  goPage(n: number): void {
    this.offset = (this.limitPerPage * n) - this.limitPerPage;
    this.getSubjects();
  }

  goPrev(): void {
    this.offset -= this.limitPerPage;

    this.getSubjects();
  }

  goNext(): void {
    this.offset += this.limitPerPage;
    this.getSubjects();
  }

  getSubjects(): void {
    this.isLoading = true;
    this.subjectService.getSubjects(this.limitPerPage, this.offset).subscribe((data) => {
        this.subjects = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
        this.isLoading = false;
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
