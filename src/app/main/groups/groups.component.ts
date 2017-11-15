import {Component, OnInit} from '@angular/core';
import {MatDialog, MatPaginatorIntl, PageEvent} from '@angular/material';

import {GroupsService} from './groups.service';
import {Group} from './group';
import {generalConst} from '../shared/constants/general-constants';
import {MatPaginatorIntlUkr} from '../shared/entities/custom-mat-paginator';
import {GroupsModalComponent} from './groups-modal/groups-modal.component';
import {UpdateDeleteEntityService} from '../entity-table/update-delete-entity.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MatPaginatorIntlUkr}]
})

export class GroupsComponent implements OnInit {
  limit = 10;
  offset = 0;
  pageSizeOptions = [5, 10, 25, 100];
  groups: Group[];
  errWithDisplayingGroups: string;
  numberOfRecords: number;
  headingColumnsOfTable = ['№', 'Назва групи', 'Назва спеціальності', 'Назва факультету'];
  facultyDictionary = {};
  specialityDictionary = {};
  btnAdd = 'Додати групу';

  constructor(private delUpdateService: UpdateDeleteEntityService, private groupsService: GroupsService, public dialog: MatDialog) {
    this.updateNumberOfRecordsInDom();
  }

  updateNumberOfRecordsInDom() {
    this.delUpdateService.groupInserted$.subscribe(resp => {
      this.numberOfRecords += 1;
    });
    this.delUpdateService.recordDeletedInDataBase$.subscribe((res) => {
      this.numberOfRecords -= 1;
    });
  }

  goPage(pageEvent: PageEvent) {
    this.limit = pageEvent.pageSize;
    this.offset = ((pageEvent.pageIndex + 1) * pageEvent.pageSize) - pageEvent.pageSize;
    this.getGroupsRange();
  }

  openDialog() {
    const dialogRef = this.dialog.open(GroupsModalComponent, {
      height: '350px',
      width: '1000px',
      data: {facultyDictionary: this.facultyDictionary, specialityDictionary: this.specialityDictionary}
    });
  }

  getGroupsRange() {
    this.groupsService.getGroupsRange(this.limit, this.offset).subscribe(data => {
        this.groups = data[0];
        data[1].forEach(facultyItem => this.facultyDictionary[facultyItem.faculty_id] = facultyItem.faculty_name);
        data[2].forEach(specialityItem => this.specialityDictionary[specialityItem.specialityId] = specialityItem.specialityName);
        this.groups.forEach(groupItem => {
          groupItem.faculty_id = this.facultyDictionary[groupItem.faculty_id];
          groupItem.speciality_id = this.specialityDictionary[groupItem.speciality_id];
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
