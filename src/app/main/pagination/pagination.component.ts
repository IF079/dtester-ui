import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import { Router} from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() linkForRouting: string;
  @Input() errWithCounting: string;
  @Input() currentPage: number;
  @Input() numberOfRecords: number;
  @Input() limitPerPage: number;
  @Input() numberOfPagesToShow: number;
  @Input() isLoading: boolean;
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  constructor(private router: Router) {
  }

  onPage(n: number): void {
    this.currentPage = n;
    this.router.navigate([this.linkForRouting, this.currentPage]);
    this.goPage.emit(n);
  }

  onNext(): void {
    this.currentPage += 1;
    this.router.navigate([this.linkForRouting, this.currentPage]);
    this.goNext.emit();
  }

  onPrev(): void {
    this.currentPage -= 1;
    this.router.navigate([this.linkForRouting, this.currentPage]);
    this.goPrev.emit();
  }

  getTotalNumberOfPages(): number {
    return Math.ceil(this.numberOfRecords / this.limitPerPage) || 0;
  }

  isLastPage(): boolean {
    return this.limitPerPage * this.currentPage >= this.numberOfRecords;
  }

  getPages(): number[] {
    const numberOfPages = this.getTotalNumberOfPages();
    const currentPage = this.currentPage;
    const defaultNumberOfPagesToShow = 9;
    const numberOfPagesToShow = this.numberOfPagesToShow || defaultNumberOfPagesToShow;
    const generatedPages: number[] = [];
    generatedPages.push(currentPage);
    for (let i = 1; i <= numberOfPagesToShow; i++) {
      if (generatedPages.length < numberOfPagesToShow) {
        if (Math.min(...generatedPages) > 1) {
          generatedPages.push(Math.min(...generatedPages) - 1);
        }
        if (Math.max(...generatedPages) < numberOfPages) {
          generatedPages.push(Math.max(...generatedPages) + 1);
        }
      }
    }
    generatedPages.sort((a, b) => a - b);
    return generatedPages;
  }

  ngOnInit() {
  }
}

const log = LoggerFactory.create(PaginationComponent);
