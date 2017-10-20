import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  @Input() errWithCounting: string;
  @Input() linkForRouting: string;
  @Input() currentPage: number;
  @Input() numberOfRecords: number;
  @Input() currentLimitPerPage: number;
  @Input() isLoading: boolean;

  @Output() goToPrevPage = new EventEmitter<boolean>();
  @Output() goToNextPage = new EventEmitter<boolean>();
  @Output() goToPage = new EventEmitter<number>();

  getNumberOfPages(): number {
    return Math.ceil(this.numberOfRecords / this.currentLimitPerPage) || 0;
  }

  getButtonNumbers(): number[] {
    const numberOfPages = this.getNumberOfPages();
    const arrOfButtonNumbers = [];
    for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
      arrOfButtonNumbers.push(pageNumber);
    }
    return arrOfButtonNumbers;
  }

  onPage(n: number): void {
    this.currentPage = n;
    this.router.navigate([this.linkForRouting, this.currentPage]);
    this.goToPage.emit(this.currentPage);
  }

  isLastPage(): boolean {
    const arrOfPages = this.getButtonNumbers();
    return this.currentPage === Math.max(...arrOfPages);
  }

  onPrev(): void {
    this.currentPage -= 1;
    this.router.navigate([this.linkForRouting, this.currentPage]);
    this.goToPrevPage.emit(true);
  }

  onNext(): void {
    this.currentPage += 1;
    this.router.navigate([this.linkForRouting,  this.currentPage]);
    this.goToNextPage.emit(true);
  }

  ngOnInit() {



  }

}

const log = LoggerFactory.create(PaginationComponent);
