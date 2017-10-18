import {Component, OnInit} from '@angular/core';
import {GroupsService} from './../shared/services/groups.service';
import {Groups} from './../shared/entities/groups';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [
    GroupsService
  ]
})
export class GroupsComponent implements OnInit {

  faculties: Groups[];

  displayedColumns = ['Id:', 'Name', 'Faculty id', 'Speciality id', ''];

  constructor(private groupsService: GroupsService ){ }
  ngOnInit() {

    this.groupsService.getGroups().subscribe(data => {
      // this.groups = data;
      console.log(this.faculties);
    });
  }
}
