import {Component, OnInit} from '@angular/core';

import {SpecialityService} from '../shared/services/crud/speciality.service';
import {Speciality} from '../shared/entities/speciality';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})

export class SpecialityComponent implements OnInit {
  specialities: Speciality[];
  headingColumnsOfTable = ['№', 'Код', 'Назва'];
  btnAdd = 'Додати';
  btnClose = 'Закрити';
  btnAddItem = 'Додати Спеціальність';
  phCode = 'Код Спеціальності';
  phName = 'Назва Спеціальності';
  currentPage = 1;
  offset = 0;
  limitPerPage = 10;
  isLoading = false;
  numberOfRecords: number;
  errWithDisplayingSubjects: string;
  errWithCountingRecords: string;
  constructor(private specialityService: SpecialityService) { }

  ngOnInit(): void {
    this.getSpecialities();
  }

  getSpecialities(): void {
    this.specialityService.getSpeciality(this.limitPerPage, this.offset).subscribe(
      data => {
        this.specialities = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.errWithDisplayingSubjects = 'Something is wrong with displaying data. Please try again.';
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
