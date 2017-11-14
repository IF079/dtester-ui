import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

import {DeleteConfirmModalComponent} from './delete-confirm-modal/delete-confirm-modal.component';
import {EditSubjectModalComponent} from './edit-subject-modal/edit-subject-modal.component';
import {UpdateDeleteEntityService} from './update-delete-entity.service';
import {EditGroupsModalComponent} from './edit-groups-modal/edit-groups-modal.component';
import {EditTimetableModalComponent} from './edit-timetable-modal/edit-timetable-modal.component';
import {EditSpecialityModalComponent} from './edit-speciality-modal/edit-speciality-modal.component';
import {EditFacultyModalComponent} from './edit-faculty-modal/edit-faculty-modal.component';
import {EditStudentModalComponent} from './edit-student-modal/edit-student-modal.component';
import {GroupsService} from '../groups/groups.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {DeleteErrorModalComponent} from './delete-error-modal/delete-error-modal.component';

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})

export class EntityTableComponent implements OnChanges, OnInit {
  tableRowArr: any[];
  @Input() entityName: string;
  @Input() entityArray: any[];
  @Input() columnsArray: string[];
  @Input() detailUrl: string;

  facultyDictionary = {};
  specialityDictionary = {};
  componentModalsDictionary = {
    Subject: EditSubjectModalComponent,
    Group: EditGroupsModalComponent,
    Speciality: EditSpecialityModalComponent,
    Faculty: EditFacultyModalComponent,
    Timetable: EditTimetableModalComponent
  };

  constructor(public dialog: MatDialog, private router: Router, private delUpdateService: UpdateDeleteEntityService,
              private groupsService: GroupsService) {

  }

  updateSubjectInDom() {

    this.delUpdateService.subjectUpdated$.subscribe(subjectData => {
      const id = 0;
      for (let i = 0; i < this.tableRowArr.length; i++) {
        if (this.tableRowArr[i][id] === subjectData[0].subject_id) {
          this.tableRowArr[i] = Object.values(subjectData[0]);
          break;
        }
      }
    });
  }

  updateSpecialityInDom() {
    this.delUpdateService.specialityUpdated$.subscribe(specialityData => {
      const id = 0;
      for (let i = 0; i < this.tableRowArr.length; i++) {
        if (this.tableRowArr[i][id] === specialityData[0].speciality_id) {
          this.tableRowArr[i] = Object.values(specialityData[0]);
          break;
        }
      }
    });
  }

  updateFacultyInDom() {
    this.delUpdateService.facultyUpdated$.subscribe(res => {
      const id = 0;
      for (let i = 0; i < this.tableRowArr.length; i++) {
        if (this.tableRowArr[i][id] === res[0].faculty_id) {
          this.tableRowArr[i] = Object.values(res[0]);
          break;
        }
      }
    });
  }

  updateGroupInDom() {
    this.delUpdateService.groupUpdated$.subscribe(groupData => {
      const id = 0;
      for (let i = 0; i < this.tableRowArr.length; i++) {
        if (this.tableRowArr[i][id] === groupData.group_id) {
          this.tableRowArr[i] = Object.values(groupData);
          break;
        }
      }
    });
  }

  deleteItemInDom() {
    this.delUpdateService.recordDeletedInDataBase$.subscribe(res => {
      this.tableRowArr = this.tableRowArr.filter(item => item !== res);
    });
  }

  openDialogAndPassDataToIt(rowItem): void {
    const dialogRef = this.dialog.open(this.componentModalsDictionary[this.entityName], {
      data: rowItem
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.entityArray.currentValue) {
      const localArray = [];
      for (const item of this.entityArray) {
        localArray.push(Object.values(item));
      }
      this.tableRowArr = localArray;
    }
  }

  ngOnInit() {
    this.updateSubjectInDom();
    this.updateSpecialityInDom();
    this.deleteItemInDom();
    this.updateGroupInDom();
    this.updateFacultyInDom();
  }

  openDeleteDialogAndPassItemToDelete(item) {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      height: '350px',
      data: {item: item, entityName: this.entityName}
    });
  }

  onSelect(item: any[]) {
    if (this.detailUrl) {
      this.router.navigate([this.detailUrl, item[0]]);
    }
  }
}
