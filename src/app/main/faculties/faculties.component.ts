import {Component, OnInit} from '@angular/core';

import {FacultyService} from './faculty.service';
import {Faculty} from './faculty';
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
  numberOfRecords: number;
  constructor(private facultyService: FacultyService) {
  }

  getFaculties() {
    this.facultyService.getFaculties(10, 0).subscribe(data => {
        this.faculties = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      },
      err => {
        this.errWithDisplayingFaculties = generalConst.errorWithDisplayData;
      });
  }

  ngOnInit() {
    this.getFaculties();
  }
}
