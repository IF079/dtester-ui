import {Component, OnInit} from '@angular/core';
import {SubjectService} from '../shared/services/subject.service';
import {Subject} from '../shared/entities/subject';

@Component({
  selector: 'app-subjects',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  subjects: Subject[];
  displayedColumns = ['Id:', 'Назва', 'Опис', 'Редагувати', 'Видалити'];

  constructor(private subjectService: SubjectService) {

  }
  getSubjects(): Subject[] {
    return this.subjects;
  }
  ngOnInit() {
    this.subjectService.getData().subscribe((data) => {
        this.subjects = data;
        console.log(data);
      });
  }

}
