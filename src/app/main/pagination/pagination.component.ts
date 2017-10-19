import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoggerFactory} from '../../shared/logger/logger.factory';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() errWithCounting: string;
  @Input() currentPage: number;
  @Input() numberOfRecords: number;
  @Input() currentLimitPerPage: number;
  @Input() isLoading: boolean;
  @Output() goToPrevPage = new EventEmitter<boolean>();
  @Output() goToNextPage = new EventEmitter<boolean>();
  @Output() goToPage = new EventEmitter<number>();

  constructor() {
  }

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

  onNext(): void {
    this.goToNextPage.emit(true);
  }

  ngOnInit() {
  }

}

const log = LoggerFactory.create(PaginationComponent);
