import {Component, OnInit} from '@angular/core';
import {SpecialityService} from '../shared/services/speciality.service';
import {Speciality} from '../shared/entities/speciality';
import {LoggerFactory} from '../shared/logger/logger.factory';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent implements OnInit {
  speciality: Speciality[];
  Row = ['ID', 'Код', 'Назва', 'Редагувати', 'Видалити'];
  constructor(private specialityService: SpecialityService) {}

  ngOnInit() {
    this.specialityService.getSpeciality().subscribe(
      data => {
        this.speciality = data;
      }
    );
  }

}

const log = LoggerFactory.create(SpecialityComponent);
