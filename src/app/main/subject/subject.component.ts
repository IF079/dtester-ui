import {Component, OnInit} from '@angular/core';

import {SubjectService} from '../shared/services/crud/subject.service';
import {Subject} from '../shared/entities/subject';
import {LoggerFactory} from '../../shared/logger/logger.factory';


@Component({
  selector: 'app-subjects',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})

export class SubjectComponent implements OnInit {
  headingColumnsOfTable = ['№', 'Назва', 'Опис'];
  subjects: Subject[];
  errWithDisplayingSubjects: string;
  errWithCountingRecords: string;
  offset = 0;
  currentPage = 1;
  limitPerPage = 10;
  numberOfRecords: number;
  isLoading = false;

  constructor(private subjectService: SubjectService) {

  }

  goPage(n: number): void {
    this.offset = (this.limitPerPage * n) - this.limitPerPage;
    this.getSubjects();
  }

  goPrev(): void {
    this.offset -= this.limitPerPage;

    this.getSubjects();
  }

  goNext(): void {
    this.offset += this.limitPerPage;
    this.getSubjects();
  }

  getSubjects(): void {
    this.isLoading = true;
    this.subjectService.getSubjects(this.limitPerPage, this.offset).subscribe((data) => {
        this.subjects = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.errWithDisplayingSubjects = 'Something is wrong with displaying data. Please try again.';
      });
  }

  ngOnInit() {
    this.getSubjects();
  }
}

const log = LoggerFactory.create(SubjectComponent);
