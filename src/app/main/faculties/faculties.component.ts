import {Component, OnInit} from '@angular/core';

import {FacultyService} from '../shared/services/crud/faculty.service';
import {Faculty} from '../shared/entities/faculty';
import {generalConst} from '../shared/constants/general-constants';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})

export class FacultiesComponent implements OnInit {
  faculties: Faculty[];
  headingColumnsOfTable = ['№', 'Назва', 'Опис', '', ''];
  placeholders = {
    name: 'Назва факультету',
    description: 'Опис факультету'
  };
  btnAdd = 'Додати факультет';
  errWithDisplayingFaculties: string;
  offset = 0;
  currentPage = 1;
  limitPerPage = 10;
  numberOfRecords: number;
  isLoading = false;
  constructor(private facultyService: FacultyService) {
  }

  goPage(n: number): void {
    this.offset = (this.limitPerPage * n) - this.limitPerPage;
    this.getFaculties();
  }

  goPrev(): void {
    this.offset -= this.limitPerPage;
    this.getFaculties();
  }

  goNext(): void {
    this.offset += this.limitPerPage;
    this.getFaculties();
  }

  getFaculties() {
    this.isLoading = true;
    this.facultyService.getFaculties(this.limitPerPage, this.offset).subscribe(data => {
        this.faculties = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
        this.isLoading = false;
      },
      err => {
        this.errWithDisplayingFaculties = generalConst.errorWithDisplayData;
      });
  }

  ngOnInit() {
    this.getFaculties();
  }
}
