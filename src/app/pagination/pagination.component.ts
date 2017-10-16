import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {LoggerFactory} from '../shared/logger/logger.factory';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor() {
  }

  @Input() errWithCounting: string;

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
    this.goToPage.emit(n);
  }

  isLastPage(): boolean {
    const arrOfPages = this.getButtonNumbers();
    return this.currentPage === Math.max(...arrOfPages);
  }

  onPrev(): void {
    this.goToPrevPage.emit(true);
  }

  onNext(next: boolean): void {
    this.goToNextPage.emit(next);
  }

  ngOnInit() {
  }

}

const log = LoggerFactory.create(PaginationComponent);
