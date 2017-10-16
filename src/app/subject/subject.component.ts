import {Component, OnInit} from '@angular/core';
import {SubjectService} from '../shared/services/subject.service';
import {Subject} from '../shared/entities/subject';
import {LoggerFactory} from '../shared/logger/logger.factory';
import {FormControl, Validators} from '@angular/forms';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-subjects',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  /***********************************Validation things ***************************************/
  SUBJECT_NAME_MAX_LENGTH = 20;
  SUBJECT_NAME_MIN_LENGTH = 10;
  SUBJECT_DESCRIPTION_MIN_LENGTH = 25;
  SUBJECT_DESCRIPTION_MAX_LENGTH = 50;
  credentials = {
    subjectName: 'admin1',
    subjectDescription: 'dtapi_admin'
  };
  subjects: Subject[];
  displayedColumns = ['Id:', 'Назва', 'Опис', 'Ред/Вид'];
  subjectName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.SUBJECT_NAME_MIN_LENGTH),
    Validators.maxLength(this.SUBJECT_NAME_MAX_LENGTH)
  ]);
  subjectDescription: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.SUBJECT_DESCRIPTION_MIN_LENGTH),
    Validators.maxLength(this.SUBJECT_DESCRIPTION_MAX_LENGTH)
  ]);
  /*********************************** Pagination things ***************************************/
  currentOffset = 0;
  currentPage = 1;
  currentLimit = 10;
  numberOfRecords: number;
  errWithDisplayingSubjects: string;
  errWithCountingRecords: string;
  isLoaded = false;

  constructor(private subjectService: SubjectService) {

  }

  getNumberOfPages(): number {
    return Math.ceil(this.numberOfRecords / this.currentLimit) || 0;
  }

  getButtonNumbers(): number[] {
    const numberOfPages = this.getNumberOfPages();
    const arrOfButtonNumbers = [];
    for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
      arrOfButtonNumbers.push(pageNumber);
    }

    return arrOfButtonNumbers;
  }

  goToPage(n: number): void {
    this.currentPage = n;
    this.currentOffset = (this.currentPage * this.currentLimit) - this.currentLimit;
    this.getSubjects();
  }
  isLastPage(): boolean {
    const arrOfPages = this.getButtonNumbers();
    return this.currentPage === Math.max(...arrOfPages);
  }
  goToPreviousPage(): void {
    this.currentOffset -= this.currentLimit;
    this.currentPage -= 1;
    this.getSubjects();
  }

  goToNextPage(): void {
    this.currentOffset += this.currentLimit;
    this.currentPage += 1;
    this.getSubjects();
  }

  getSubjects(): void {
    this.subjectService.getSubjects(this.currentLimit, this.currentOffset).subscribe((data) => {
        this.subjects = data;
        this.isLoaded = true;
      },
      err => {
        console.log(err);
        this.errWithDisplayingSubjects = 'Something is wrong with displaying data. Please try again.';
      });
  }

  countRecords(): void {
    this.subjectService.countSubjects().subscribe((data) => {
        this.numberOfRecords = parseInt(data.numberOfRecords, 10);
      },
      err => {
        console.log(err);
        this.errWithCountingRecords = 'Something is wrong with displaying the number of subjects';
      });
  }

  ngOnInit() {
    this.getSubjects();
    this.countRecords();
  }

}

const log = LoggerFactory.create(SubjectComponent);
