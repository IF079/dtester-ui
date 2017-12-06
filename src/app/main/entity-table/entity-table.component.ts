import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Group} from '../groups/groups-classes/group';
import {SubjectDto} from '../subject/subject-classes/subject-dto';
import {SpecialityDto} from '../speciality/speciality-classes/speciality-dto';
import {Faculty} from '../faculties/faculty';
import {Student} from '../student/student-classes/student';
import {TimeTable} from '../time-table/timetable-classes/time-table';
import {DeleteConfirmModalComponent} from './delete-confirm-modal/delete-confirm-modal.component';
import {EditSubjectModalComponent} from '../subject/edit-subject-modal/edit-subject-modal.component';
import {UpdateDeleteEntityService} from '../shared/services/update-delete-entity-service/update-delete-entity.service';
import {EditGroupsModalComponent} from '../groups/edit-groups-modal/edit-groups-modal.component';
import {EditTimetableModalComponent} from '../time-table/edit-timetable-modal/edit-timetable-modal.component';
import {EditSpecialityModalComponent} from '../speciality/edit-speciality-modal/edit-speciality-modal.component';
import {EditFacultyModalComponent} from '../faculties/edit-faculty-modal/edit-faculty-modal.component';
import {EditStudentModalComponent} from '../student/edit-student-modal/edit-student-modal.component';

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

  constructor(public dialog: MatDialog,
              private router: Router,
              private delUpdateService: UpdateDeleteEntityService) {
  }

  private updateTableRowArr<T>(data: T, idName: string) {
    const id = 0;
    for (let i = 0; i < this.tableRowArr.length; i++) {
      if (this.tableRowArr[i][id] === data[0][idName]) {
        this.tableRowArr[i] = Object.values(data[0]);
        break;
      }
    }
  }

  updateSubjectInDom() {
    this.delUpdateService.itemUpdated$.subscribe((subjectData: SubjectDto[]) => {
      this.updateTableRowArr<SubjectDto[]>(subjectData, 'subject_id');
    });
  }

  updateStudentInDom() {
    this.delUpdateService.itemUpdated$.subscribe((studentData: Student[]) => {
      this.updateTableRowArr<Student[]>(studentData, 'userId');
    });
  }

  updateSpecialityInDom() {
    this.delUpdateService.itemUpdated$.subscribe((specialityData: SpecialityDto[]) => {
      this.updateTableRowArr<SpecialityDto[]>(specialityData, 'speciality_id');
    });
  }

  updateFacultyInDom() {
    this.delUpdateService.itemUpdated$.subscribe((facultyData: Faculty[]) => {
      this.updateTableRowArr<Faculty[]>(facultyData, 'faculty_id');
    });
  }

  updateGroupInDom() {
    this.delUpdateService.itemUpdated$.subscribe((groupData: Group[]) => {
      this.updateTableRowArr<Group[]>(groupData, 'group_id');
    });
  }

  updateTimetableInDom() {
    this.delUpdateService.itemUpdated$.subscribe((timetableData: TimeTable[]) => {
      this.updateTableRowArr<TimeTable[]>(timetableData, 'timetable_id');
    });
  }

  deleteItemInDom() {
    this.delUpdateService.itemDeleted$.subscribe(res => {
      this.tableRowArr = this.tableRowArr.filter(item => item !== res);
    });
  }

  openDialogForUpdate(rowItem): void {
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

  openDialogForDelete(item) {
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
