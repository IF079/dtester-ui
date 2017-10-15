import {Component, OnInit} from '@angular/core';
import {SubjectService} from '../shared/services/subject.service';
import {Subject} from '../shared/entities/subject';
import {LoggerFactory} from '../shared/logger/logger.factory';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-subjects',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  SUBJECT_NAME_MAX_LENGTH = 20;
  SUBJECT_NAME_MIN_LENGTH = 10;
  subjectName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.SUBJECT_NAME_MIN_LENGTH),
    Validators.maxLength(this.SUBJECT_NAME_MAX_LENGTH)
  ]);
  SUBJECT_DESCRIPTION_MIN_LENGTH = 25;
  SUBJECT_DESCRIPTION_MAX_LENGTH = 50;
  subjectDescription: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.SUBJECT_DESCRIPTION_MIN_LENGTH),
    Validators.maxLength(this.SUBJECT_DESCRIPTION_MAX_LENGTH)
  ]);
  credentials = {
    subjectName: 'admin1',
    subjectDescription: 'dtapi_admin'
  };
  subjects: Subject[];
  displayedColumns = ['Id:', 'Назва', 'Опис', 'Редагувати', 'Видалити'];
  errWithDisplayingSubjects: string;

  constructor(private subjectService: SubjectService) {

  }

  getSubjects(): Subject[] {
    return this.subjects;
  }

  ngOnInit() {
    this.subjectService.getSubjects().subscribe((data) => {
        this.subjects = data;
        console.log(data);
      },
      err => {
        console.log(err);
        this.errWithDisplayingSubjects = 'Something is wrong with displaying data. Please try again.';
      });
  }

}

const log = LoggerFactory.create(SubjectComponent);
