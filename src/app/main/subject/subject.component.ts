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
  offset = 0;
  page = 1;
  perPage = 10;
  pages: number;
  loading = false;

  constructor(private subjectService: SubjectService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      if (!params['currPage']) {
        this.page = 1;
        this.goPage(this.page);

      } else {
        this.page = +params['currPage'];
        this.goPage(this.page);
      }
    });
  }
  goPage(n: number): void {
    this.page = n;
    this.offset = (this.page * this.perPage) - this.perPage;
    this.router.navigate(['subject', this.page]);
    this.getSubjects();
  }
  goPrev(): void {
    this.offset -= this.perPage;
    this.page -= 1;
    this.router.navigate(['subject', this.page]);
    this.getSubjects();
  }
  goNext(): void {
    this.offset += this.perPage;
    this.page += 1;
    this.router.navigate(['subject', this.page]);
    this.getSubjects();
  }
  getSubjects(): void {
    this.loading = true;
    this.subjectService.getSubjects(this.perPage, this.offset).subscribe((data) => {
        this.subjects = data;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.errWithDisplayingSubjects = 'Something is wrong with displaying data. Please try again.';
      });
  }
  countRecords(): void {
    this.subjectService.countSubjects().subscribe((data) => {
        this.pages = parseInt(data.numberOfRecords, 10);
      },
      err => {
        console.log(err);
        this.errWithCountingRecords = 'Something is wrong with displaying the number of subjects';
      });
  }
  ngOnInit() {
    this.router.navigate(['subject', this.page]);
    this.getSubjects();
    this.countRecords();
  }
}
const log = LoggerFactory.create(SubjectComponent);
