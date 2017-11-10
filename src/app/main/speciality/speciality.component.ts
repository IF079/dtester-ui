import {Component, OnInit} from '@angular/core';
import {MatDialog, MatPaginatorIntl, PageEvent} from '@angular/material';

import {SpecialityService} from './speciality.service';
import {Speciality} from './speciality';
import {generalConst} from '../shared/constants/general-constants';
import {MatPaginatorIntlUkr} from '../shared/entities/custom-mat-paginator';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlUkr}]
})

export class SpecialityComponent implements OnInit {
  limit = 10;
  offset = 0;
  pageSizeOptions = [5, 10, 25, 100];
  errWithDisplayingSubjects: string;
  numberOfRecords: number;
  specialities: Speciality[];
  headingColumnsOfTable = ['№', 'Код', 'Назва'];
  modalInfo = {
    btnAdd: 'Додати',
    btnClose: 'Закрити',
    btnAddSpeciality: 'Додати Спеціальність',
    placeholderCode: 'Код Спеціальності',
    placeholderName: 'Назва Спеціальності',
  };

  goPage(pageEvent: PageEvent) {
    this.limit = pageEvent.pageSize;
    this.offset = ((pageEvent.pageIndex + 1) * pageEvent.pageSize) - pageEvent.pageSize;
    this.getSpecialities();
  }

  constructor(private specialityService: SpecialityService,
              private dialog: MatDialog) {

  }

  getSpecialities(): void {
    this.specialityService.getSpeciality(this.limit, this.offset).subscribe(data => {
        this.specialities = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      },
      err => {
        this.errWithDisplayingSubjects = generalConst.errorWithDisplayData;
      }
    );
  }

  ngOnInit(): void {
    this.getSpecialities();
  }

}
