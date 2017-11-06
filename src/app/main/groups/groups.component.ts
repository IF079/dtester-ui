import {Component, OnInit} from '@angular/core';

import {GroupsService} from './groups.service';
import {Group} from './group';
import {generalConst} from '../shared/constants/general-constants';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {
  groups: Group[];
  errWithDisplayingGroups: string;
  numberOfRecords: number;
  headingColumnsOfTable = ['№', 'Назва', '№ Факультету', '№ Спеціальності', '', ''];
  constructor(private groupsService: GroupsService) {
  }
  getGroupsRange() {
    this.groupsService.getGroupsRange(10, 0).subscribe(data => {
        this.groups = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
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
