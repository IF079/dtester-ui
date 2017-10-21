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
  linkForRouting = 'subject';
  /*********************************** Pagination things ***************************************/
  offset = 0;
  currentPage = 1;
  limitPerPage = 10;
  numberOfRecords: number;
  isLoading = false;

  constructor(private subjectService: SubjectService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      if (!params['currentPage']) {
        this.currentPage = 1;
        this.goPage(this.currentPage);
      } else {
        this.currentPage = +params['currentPage'];
        this.goPage(this.currentPage);
      }
    });
  }
  goPage(n: number): void {
    this.offset = (this.limitPerPage * this.currentPage) - this.limitPerPage;
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
