import {Component, OnInit} from '@angular/core';
import {MatDialog, PageEvent} from '@angular/material';

import {SpecialityService} from './speciality-service/speciality.service';
import {Speciality} from './speciality-entity/speciality';
import {generalConst} from '../shared/constants/general-constants';
import {SpecialityModalComponent} from './add-speciality-modal/add-speciality-modal.component';
import {UpdateDeleteEntityService} from '../entity-table/update-delete-entity.service';

@Component({
  selector: 'dtest-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})

export class SpecialityComponent implements OnInit {
  limit = 10;
  offset = 0;
  pageSizeOptions = [5, 10, 25, 50];
  errWithDisplayingSpeciality: string;
  numberOfRecords: number;
  specialities: Speciality[] = [];
  headingColumnsOfTable = ['№', 'Код Спеціальності', 'Назва Спеціальності'];
  btnAddSpeciality = 'Додати Спеціальність';

  constructor(private specialityService: SpecialityService,
              private dialog: MatDialog,
              private delUpdateService: UpdateDeleteEntityService) {
    this.delUpdateService.itemDeleted$.subscribe(() => {
      this.numberOfRecords --;
    });
    this.delUpdateService.itemInserted$.subscribe(
      () => {
        this.numberOfRecords ++;
      }
    );
  }

  getSpecialities(): void {
    this.specialityService.getSpeciality(this.limit, this.offset).subscribe(specialityData => {
        this.specialities = specialityData[0];
        this.numberOfRecords = parseInt(specialityData[1].numberOfRecords, 10);
      },
      err => {
        this.errWithDisplayingSpeciality = generalConst.errorWithDisplayData;
      }
    );
  }

  goPage(pageEvent: PageEvent) {
    this.limit = pageEvent.pageSize;
    this.offset = ((pageEvent.pageIndex + 1) * pageEvent.pageSize) - pageEvent.pageSize;
    this.getSpecialities();
  }

  openDialog() {
    this.dialog.open(SpecialityModalComponent);
  }

  ngOnInit(): void {
    this.getSpecialities();
  }
}
