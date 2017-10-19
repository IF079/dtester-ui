import {Component, OnInit} from '@angular/core';
import {SubjectService} from '../shared/services/crud/subject.service';
import {Subject} from '../shared/entities/subject';
import {ActivatedRoute, Router} from '@angular/router';
import {LoggerFactory} from '../../shared/logger/logger.factory';


@Component({
  selector: 'app-subjects',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  displayedColumns = ['Id:', 'Назва', 'Опис', 'Ред', 'Bид'];
  subjects: Subject[];
  errWithDisplayingSubjects: string;
  errWithCountingRecords: string;

  /*********************************** Pagination things ***************************************/
  currentOffset = 0;
  currPage = 1;
  currLimit = 10;
  numOfRecords: number;
  isLoading = false;

  constructor(private subjectService: SubjectService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      if (!params['currPage']) {
        this.currPage = 1;
        this.goToPage(this.currPage);

      } else {
        this.currPage = +params['currPage'];
        this.goToPage(this.currPage);
      }
    });
  }

  getNumberOfPages(): number {
    return Math.ceil(this.numOfRecords / this.currLimit) || 0;
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
    this.currPage = n;
    this.currentOffset = (this.currPage * this.currLimit) - this.currLimit;
    this.router.navigate(['subject', this.currPage]);
    this.getSubjects();
  }

  isLastPage(): boolean {
    const arrOfPages = this.getButtonNumbers();
    return this.currPage === Math.max(...arrOfPages);
  }

  goToPreviousPage(): void {
    this.currentOffset -= this.currLimit;
    this.currPage -= 1;
    this.router.navigate(['subject', this.currPage]);

    this.getSubjects();
  }

  goToNextPage(): void {
    this.currentOffset += this.currLimit;
    this.currPage += 1;
    this.router.navigate(['subject', this.currPage]);
    this.getSubjects();
  }

  getSubjects(): void {
    this.isLoading = true;
    this.subjectService.getSubjects(this.currLimit, this.currentOffset).subscribe((data) => {
        this.subjects = data;
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.errWithDisplayingSubjects = 'Something is wrong with displaying data. Please try again.';
      });
  }

  countRecords(): void {
    this.subjectService.countSubjects().subscribe((data) => {
        this.numOfRecords = parseInt(data.numberOfRecords, 10);
      },
      err => {
        console.log(err);
        this.errWithCountingRecords = 'Something is wrong with displaying the number of subjects';
      });
  }

  ngOnInit() {
    this.router.navigate(['subject', this.currPage]);
    this.getSubjects();
    this.countRecords();
  }

}

const log = LoggerFactory.create(SubjectComponent);
