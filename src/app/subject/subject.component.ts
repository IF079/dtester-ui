import {Component, OnInit} from '@angular/core';
import {SubjectService} from '../shared/services/subject.service';
import {Subject} from '../shared/entities/subject';
import {LoggerFactory} from '../shared/logger/logger.factory';
import {ActivatedRoute, Router} from '@angular/router';


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
  currentOffset = 0;
  currPage = 1;
  currLimit = 10;
  numOfRecords: number;
  isLoading = false;

  constructor(private subjectService: SubjectService, private route: ActivatedRoute, private router: Router) {

  }

  getSubjects(limit, offset): void {
    this.isLoading = true;
    this.subjectService.getSubjects(limit, offset).subscribe((data) => {
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
    this.router.navigate([this.linkForRouting, this.currPage]);
    this.getSubjects(this.currLimit, this.currentOffset);
    this.countRecords();
  }

}

const log = LoggerFactory.create(SubjectComponent);
