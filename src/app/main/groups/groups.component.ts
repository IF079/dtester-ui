import {Component, OnInit} from '@angular/core';
import {MatDialog, MatPaginatorIntl, PageEvent} from '@angular/material';

import {GroupsService} from './groups.service';
import {Group} from './group';
import {generalConst} from '../shared/constants/general-constants';
import {MatPaginatorIntlUkr} from '../shared/entities/custom-mat-paginator';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlUkr}]
})

export class GroupsComponent implements OnInit {
  limit = 10;
  offset = 0;
  pageSizeOptions = [5, 10, 25, 100];
  groups: Group[];
  errWithDisplayingGroups: string;
  numberOfRecords: number;
  headingColumnsOfTable = ['№', 'Назва групи', 'Назва спеціальності', 'Назва факультету'];
  facArr = [];
  specArr = [];

  constructor(private groupsService: GroupsService) {
  }

  goPage(pageEvent: PageEvent) {
    this.limit = pageEvent.pageSize;
    this.offset = ((pageEvent.pageIndex + 1) * pageEvent.pageSize) - pageEvent.pageSize;
    this.getGroupsRange();
  }

  getGroupsRange() {
    this.groupsService.getGroupsRange(this.limit, this.offset).subscribe(data => {
        this.groups = data[0];
        data[1].forEach(item => this.facArr[item.faculty_id] = item.faculty_name);
        console.log(this.facArr);
        data[2].forEach(item => this.specArr[item.specialityId] = item.specialityName);
        console.log(this.specArr);
        data[0].forEach(item => {
            item.faculty_id = this.facArr[item.faculty_id];
            item.speciality_id = this.specArr[item.speciality_id];
        });
        this.numberOfRecords = parseInt(data[3].numberOfRecords, 10);

      },
      err => {
        console.log(err);
        this.errWithDisplayingGroups = generalConst.errorWithDisplayData;
      });
  }


  ngOnInit() {
    this.getGroupsRange();
  }
}
