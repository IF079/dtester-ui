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
  speciality: Speciality[];
  Row = ['ID', 'Код', 'Назва', '', ''];
  page = 1;
  offset = 0;
  perPage = 10;
  loading = false;
  pages: number;
  errWithDisplayingSubjects: string;
  errWithCountingRecords: string;

  constructor(private specialityService: SpecialityService) {
  }

  ngOnInit(): void {
    this.getSpeciality();
    this.countSpeciality();
  }

  getSpeciality(): void {
    this.specialityService.getSpeciality(this.perPage, this.offset).subscribe(
      data => {
        this.speciality = data;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.errWithDisplayingSubjects = 'Something is wrong with displaying data. Please try again.';
      }
    );
  }

  countSpeciality(): void {
    this.specialityService.countSpeciality().subscribe(
      data => {
        this.pages = parseInt(data.numberOfRecords, 10);
      },
    err => {
      console.log(err);
      this.errWithCountingRecords = 'Something is wrong with displaying the number of specialities';
      }
    );
  }

  goPage(n: number): void {
    this.page = n;
    this.offset = (n * this.perPage) - this.perPage;
    this.getSpeciality();
  }

  goNext(): void {
    this.offset += this.perPage;
    this.page++;
    this.getSpeciality();
  }

  goPrev(): void {
    this.page--;
    this.offset -= this.perPage;
    this.getSpeciality();
  }
}
const log = LoggerFactory.create(SpecialityComponent);
