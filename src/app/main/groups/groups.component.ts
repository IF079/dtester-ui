import {Component, OnInit} from '@angular/core';
import {MatDialog, PageEvent} from '@angular/material';

import {GroupsService} from './groups-service/groups.service';
import {Group} from './groups-classes/group';
import {generalConst} from '../shared/constants/general-constants';
import {AddGroupsModalComponent} from './add-groups-modal/add-groups-modal.component';
import {UpdateDeleteEntityService} from '../shared/services/update-delete-entity-service/update-delete-entity.service';

@Component({
  selector: 'dtest-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
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
    this.delUpdateService.itemInserted$.subscribe(() => {
      this.numberOfRecords ++;
    });
    this.delUpdateService.itemDeleted$.subscribe(() => {
      this.numberOfRecords --;
    });
  }

  goPage(pageEvent: PageEvent) {
    this.limit = pageEvent.pageSize;
    this.offset = ((pageEvent.pageIndex + 1) * pageEvent.pageSize) - pageEvent.pageSize;
    this.getGroupsRange();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddGroupsModalComponent, {
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
        this.errWithDisplayingGroups = generalConst.errorWithDisplayData;
      });
  }

  ngOnInit() {
    this.getGroupsRange();
  }
}
