import {Component, OnInit} from '@angular/core';

import {SpecialityService} from './speciality.service';
import {Speciality} from './speciality';
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

  numberOfRecords: number;
  errWithDisplayingSpeciality: string;
  constructor(private specialityService: SpecialityService) { }

  ngOnInit(): void {
    this.getSpecialities();
  }

  getSpecialities(): void {
    this.specialityService.getSpeciality(10, 0).subscribe(
      specialityData => {
        this.specialities = specialityData[0];
        this.numberOfRecords = parseInt(specialityData[1].numberOfRecords, 10);
      },
      err => {
        this.errWithDisplayingSpeciality = generalConst.errorWithDisplayData;
      }
    );
  }


}
