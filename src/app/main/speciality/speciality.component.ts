import {Component, OnInit, ViewChild} from '@angular/core';

import {SpecialityService} from './speciality.service';
import {Speciality} from './speciality';
import {generalConst} from '../shared/constants/general-constants';
import {MatDialog} from '@angular/material';

import {RecordsCount} from '../shared/entities/recordsCount';
import {PageEvent} from '@angular/material';


@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})

export class SpecialityComponent implements OnInit {
  limit = 10;
  pageSizeOptions = [5, 10, 25, 100];
  offset = 0;
  errWithDisplayingSubjects: string;
  numberOfRecords: number;
  specialities: Speciality[];
  pageEvent: PageEvent;
  headingColumnsOfTable = ['№', 'Код', 'Назва', '', ''];
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
