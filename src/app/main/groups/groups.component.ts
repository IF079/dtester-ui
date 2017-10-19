import {Component, OnInit} from '@angular/core';
import {GroupsService} from '../shared/services/crud/groups.service';
import {Groups} from '../shared/entities/groups';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [
    GroupsService
  ]
})
export class GroupsComponent implements OnInit {

  groups: Groups[];

  displayedColumns = ['Id:', 'Name', 'Faculty id', 'Speciality id', ''];

  constructor(private groupsService: GroupsService) {
  }

  ngOnInit() {

    this.groupsService.getGroups().subscribe(data => {
      this.groups = data;
      console.log(this.groups);
    });
  }
}
