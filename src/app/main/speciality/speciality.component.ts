import {Component, OnInit} from '@angular/core';

import {SpecialityService} from '../shared/services/crud/speciality.service';
import {Speciality} from '../shared/entities/speciality';
import {generalConst} from '../shared/constants/general-constants';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})

export class SpecialityComponent implements OnInit {
  specialities: Speciality[];
  headingColumnsOfTable = ['№', 'Код', 'Назва', '', ''];
  modalInfo = {
  btnAdd: 'Додати',
  btnClose: 'Закрити',
  btnAddSpeciality: 'Додати Спеціальність',
  placeholderCode: 'Код Спеціальності',
  placeholderName: 'Назва Спеціальності',
  };
  currentPage = 1;
  offset = 0;
  limitPerPage = 10;
  isLoading = false;
  numberOfRecords: number;
  errWithDisplayingSpeciality: string;
  constructor(private specialityService: SpecialityService) { }

  ngOnInit(): void {
    this.getSpecialities();
  }

  getSpecialities(): void {
    this.specialityService.getSpeciality(this.limitPerPage, this.offset).subscribe(
      specialityData => {
        this.specialities = specialityData[0];
        this.numberOfRecords = parseInt(specialityData[1].numberOfRecords, 10);
        this.isLoading = false;
      },
      err => {
        this.errWithDisplayingSpeciality = generalConst.errorWithDisplayData;
      }
    );
  }

  goPage(n: number): void {
    this.offset = (n * this.limitPerPage) - this.limitPerPage;
    this.getSpecialities();
  }

  goNext(): void {
    this.offset += this.limitPerPage;
    this.getSpecialities();
  }

  goPrev(): void {
    this.offset -= this.limitPerPage;
    this.getSpecialities();
  }
}
