import {Component, OnInit} from '@angular/core';
import {SpecialityService} from '../shared/services/speciality.service';
import {Speciality} from '../shared/entities/speciality';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent implements OnInit {
  public speciality: Speciality;

  constructor(private specialityService: SpecialityService) {
  }

  ngOnInit() {
    this.specialityService.getSpeciality().subscribe(
      data => {
        this.speciality = data;
        console.log(data);
      }
    );
  }

}
