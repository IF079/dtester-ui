import {Component, OnInit} from '@angular/core';
import {SpecialityService} from '../shared/services/crud/speciality.service';
import {Speciality} from '../shared/entities/speciality';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {ActivatedRoute, Router} from '@angular/router';

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
  linkForRouting = 'speciality';
  constructor(private specialityService: SpecialityService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      if (!params['currentPage']) {
        this.page = 1;
        this.goPage(this.page);
      } else {
        this.page = +params['currentPage'];
        this.goPage(this.page);
      }
    });
  }

  ngOnInit(): void {
    this.router.navigate([this.linkForRouting, this.page]);
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

    this.offset = (n * this.perPage) - this.perPage;
    this.getSpeciality();
  }

  goNext(): void {
    this.offset += this.perPage;

    this.getSpeciality();
  }

  goPrev(): void {

    this.offset -= this.perPage;
    this.getSpeciality();
  }
}
const log = LoggerFactory.create(SpecialityComponent);
