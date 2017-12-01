import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Group} from '../groups/group';
import {SubjectDto} from '../subject/subject-dto';
import {SpecialityDto} from '../speciality/speciality-dto';
import {Faculty} from '../faculties/faculty';
import {Student} from '../student/student';
import {TimeTable} from '../time-table/time-table';
import {DeleteConfirmModalComponent} from './delete-confirm-modal/delete-confirm-modal.component';
import {EditSubjectModalComponent} from './edit-subject-modal/edit-subject-modal.component';
import {UpdateDeleteEntityService} from './update-delete-entity.service';
import {EditGroupsModalComponent} from './edit-groups-modal/edit-groups-modal.component';
import {EditTimetableModalComponent} from './edit-timetable-modal/edit-timetable-modal.component';
import {EditSpecialityModalComponent} from './edit-speciality-modal/edit-speciality-modal.component';
import {EditFacultyModalComponent} from './edit-faculty-modal/edit-faculty-modal.component';
import {EditStudentModalComponent} from './edit-student-modal/edit-student-modal.component';

@Component({
  selector: 'dtest-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})

export class EntityTableComponent implements OnChanges, OnInit {
  tableRowArr: any[];
  @Input() entityName: string;
  @Input() entityArray: any[];
  @Input() columnsArray: string[];
  @Input() detailUrl: string;

  componentModalsDictionary = {
    Subject: EditSubjectModalComponent,
    Group: EditGroupsModalComponent,
    Speciality: EditSpecialityModalComponent,
    Faculty: EditFacultyModalComponent,
    Student: EditStudentModalComponent,
    TimeTable: EditTimetableModalComponent
  };

  constructor(public dialog: MatDialog, private router: Router, private delUpdateService: UpdateDeleteEntityService) {
  }

  updateSubjectInDom() {
    this.delUpdateService.entityUpdated$.subscribe((subjectData: SubjectDto[]) => {
      const id = 0;
      for (let i = 0; i < this.tableRowArr.length; i++) {
        if (this.tableRowArr[i][id] === subjectData[0].subject_id) {
          this.tableRowArr[i] = Object.values(subjectData[0]);
          break;
        }
      }
    });
  }

  updateStudentInDom() {
    this.delUpdateService.entityUpdated$.subscribe((studentData: Student[]) => {
      const id = 0;
      for (let i = 0; i < this.tableRowArr.length; i++) {
        if (this.tableRowArr[i][id] === studentData[0].userId) {
          this.tableRowArr[i] = Object.values(studentData[0]);
          break;
        }
      }
    });
  }

  updateSpecialityInDom() {
    this.delUpdateService.entityUpdated$.subscribe((specialityData: SpecialityDto[]) => {
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
    this.delUpdateService.entityUpdated$.subscribe((facultyData: Faculty[]) => {
      const id = 0;
      for (let i = 0; i < this.tableRowArr.length; i++) {
        if (this.tableRowArr[i][id] === facultyData[0].faculty_id) {
          this.tableRowArr[i] = Object.values(facultyData[0]);
          break;
        }
      }
    });
  }

  updateGroupInDom() {
    this.delUpdateService.entityUpdated$.subscribe((groupData: Group[]) => {
      const id = 0;
      for (let i = 0; i < this.tableRowArr.length; i++) {
        if (this.tableRowArr[i][id] === groupData[0].group_id) {
          this.tableRowArr[i] = Object.values(groupData[0]);
          break;
        }
      }
    });
  }

  updateTimetableInDom() {
    this.delUpdateService.entityUpdated$.subscribe((timetableData: TimeTable[]) => {
      const id = 0;
      for (let i = 0; i < this.tableRowArr.length; i++) {
        if (this.tableRowArr[i][id] === timetableData[0].timetable_id) {
          this.tableRowArr[i] = Object.values(timetableData[0]);
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
    this.dialog.open(this.componentModalsDictionary[this.entityName], {
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
    this.updateTimetableInDom();
    this.updateStudentInDom();
  }

  openDeleteDialogAndPassItemToDelete(item) {
    this.dialog.open(DeleteConfirmModalComponent, {
      data: {item: item, entityName: this.entityName}
    });
  }

  onSelect(item: any[]) {
    if (this.detailUrl) {
      this.router.navigate([this.detailUrl, item[0]]);
    }
  }
}
