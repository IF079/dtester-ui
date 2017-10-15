import {Component, OnInit} from '@angular/core';
import {FacultyService} from './../shared/services/faculty.service';
import {Faculty} from './../shared/entities/faculty';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})
export class FacultiesComponent implements OnInit {

  faculties: Faculty[];
  /*faculty: Faculty;*/
  displayedColumns = ['Id:', 'Назва', 'Опис', 'Редагувати'];

  constructor(private facultyService: FacultyService ){ }

  ngOnInit() {

    this.facultyService.getFaculties().subscribe(data => {
      this.faculties = data;
      console.log(this.faculties);
    });
  }
}
