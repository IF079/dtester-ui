import {Component, OnInit} from '@angular/core';

import {GroupsService} from '../shared/services/crud/groups.service';
import {Group} from '../shared/entities/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {
  groups: Group[];
  errWithDisplayingSubjects: string;
  offset = 0;
  currentPage = 1;
  limitPerPage = 10;
  numberOfRecords: number;
  isLoading = false;
  headingColumnsOfTable = ['№', 'Назва', '№ Факультету', '№ Спеціальності'];
  constructor(private groupsService: GroupsService) {
  }
  getGroups() {
    this.isLoading = true;
    this.groupsService.getGroups(this.limitPerPage, this.offset).subscribe(data => {
        this.groups = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.errWithDisplayingSubjects = 'Something is wrong with displaying data. Please try again.';
      });
  }

  goPage(n: number): void {
    this.offset = (this.limitPerPage * n) - this.limitPerPage;
    this.getGroups();
  }

  goPrev(): void {
    this.offset -= this.limitPerPage;

    this.getGroups();
  }

  goNext(): void {
    this.offset += this.limitPerPage;
    this.getGroups();
  }

  ngOnInit() {
    this.getGroups();
  }
}
