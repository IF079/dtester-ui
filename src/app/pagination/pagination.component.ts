import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {LoggerFactory} from '../shared/logger/logger.factory';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  @Input() currentOffset: number;
  @Input() getData: (limit: number, offset: number) => void;
  @Input() countData: () => void;
  @Input() errWithCounting: string;
  @Input() linkForRouting: string;
  @Input() currentPage: number;
  @Input() numberOfRecords: number;
  @Input() currentLimitPerPage: number;
  @Input() isLoading: boolean;

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


  isLastPage(): boolean {
    const arrOfPages = this.getButtonNumbers();
    return this.currentPage === Math.max(...arrOfPages);
  }
  onPage(n: number): void {
    this.currentPage = n;
    this.currentOffset = (this.currentPage * this.currentLimitPerPage) - this.currentLimitPerPage;
    this.router.navigate([this.linkForRouting, this.currentPage]);
    this.getData(this.currentLimitPerPage, this.currentOffset);

  }
  onPrev(): void {
    this.currentPage -= 1;
    this.currentOffset -= this.currentLimitPerPage;
    this.router.navigate([this.linkForRouting, this.currentPage]);
    this.getData(this.currentLimitPerPage, this.currentOffset);

  }

  onNext(): void {
    this.currentPage += 1;
    this.currentOffset += this.currentLimitPerPage;
    this.router.navigate([this.linkForRouting, this.currentPage]);
    this.getData(this.currentLimitPerPage, this.currentOffset);
  }

  ngOnInit() {
    this.router.navigate([this.linkForRouting, this.currentPage]);
    this.countData();
  }

}

const log = LoggerFactory.create(PaginationComponent);
