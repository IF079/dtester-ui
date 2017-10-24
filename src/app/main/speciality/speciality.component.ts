import {Component, OnInit} from '@angular/core';
import {SpecialityService} from '../shared/services/crud/speciality.service';
import {Speciality} from '../shared/entities/speciality';
import {LoggerFactory} from '../../shared/logger/logger.factory';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent implements OnInit {
  specialities: Speciality[];
  headingColumnsOfTable = ['ID', 'Код', 'Назва'];
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
    this.countSpecialities();
  }

  getSpecialities(): void {
    this.specialityService.getSpeciality(this.limitPerPage, this.offset).subscribe(
      data => {
        this.specialities = data;
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.errWithDisplayingSubjects = 'Something is wrong with displaying data. Please try again.';
      }
    );
  }

  countSpecialities(): void {
    this.specialityService.countSpeciality().subscribe(
      data => {
        this.numberOfRecords = parseInt(data.numberOfRecords, 10);
      },
    err => {
      console.log(err);
      this.errWithCountingRecords = 'Something is wrong with displaying the number of specialities';
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
const log = LoggerFactory.create(SpecialityComponent);
