import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoggerFactory} from '../../shared/logger/logger.factory';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() errWithCounting: string;
  @Input() page: number;
  @Input() count: number;
  @Input() perPage: number;
  @Input() pagesToShow: number;
  @Input() loading: boolean;
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  constructor() {
  }
  onPage(n: number): void {
    this.goPage.emit(n);
  }
  onNext(): void {
    this.goNext.emit();
  }
  onPrev(): void {
    this.goPrev.emit();
  }
  totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }
  lastPage(): boolean {
    return this.perPage * this.page >= this.count;
  }
  getPages(): number[] {
    const c = this.totalPages();
    const p = this.page;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }
  ngOnInit() {
  }
}

const log = LoggerFactory.create(PaginationComponent);
