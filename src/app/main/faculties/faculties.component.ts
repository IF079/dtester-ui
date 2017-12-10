import {Component, OnInit} from '@angular/core';
import {MatDialog, PageEvent} from '@angular/material';

import {FacultyModalComponent} from './add-faculty-modal/add-faculty-modal.component';
import {FacultyService} from './faculty.service';
import {Faculty} from './faculty';
import {generalConst} from '../shared/constants/general-constants';
import {UpdateDeleteEntityService} from '../shared/services/update-delete-entity-service/update-delete-entity.service';

@Component({
  selector: 'dtest-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})

export class FacultiesComponent implements OnInit {
  limit = 10;
  offset = 0;
  pageSizeOptions = [5, 10, 25, 100];
  faculties: Faculty[];
  headingColumnsOfTable = ['№', 'Назва факультету', 'Опис факультету'];
  placeholders = {
    name: 'Назва факультету',
    description: 'Опис факультету'
  };
  btnAdd = 'Додати факультет';
  errWithDisplayingFaculties: string;
  numberOfRecords: number;

 constructor(private delUpdateService: UpdateDeleteEntityService,
             private facultyService: FacultyService,
             public dialog: MatDialog) {
   this.updateNumberOfRecordsInDomWhenAdded();
   this.updateNumberOfRecordsInDomWhenDeleted();
  }

  updateNumberOfRecordsInDomWhenAdded() {
    this.delUpdateService.itemInserted$.subscribe(() => {
        this.numberOfRecords ++;
      });
  }

  updateNumberOfRecordsInDomWhenDeleted() {
    this.delUpdateService.itemDeleted$.subscribe(() => {
        this.numberOfRecords --;
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FacultyModalComponent);
  }

  goPage(pageEvent: PageEvent) {
    this.limit = pageEvent.pageSize;
    this.offset = ((pageEvent.pageIndex + 1) * pageEvent.pageSize) - pageEvent.pageSize;
    this.getFacultiesRange();
  }

  getFacultiesRange() {
    this.facultyService.getFacultiesRange(this.limit, this.offset).subscribe(data => {
        this.faculties = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      },
      err => {
        this.errWithDisplayingFaculties = generalConst.errorWithDisplayData;
      });
  }

  ngOnInit() {
    this.getFacultiesRange();
  }
}
