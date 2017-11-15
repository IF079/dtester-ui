import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

import {UpdateDeleteEntityService} from '../update-delete-entity.service';
import {TimeTableService} from '../../time-table/time-table.service';

@Component({
  selector: 'app-edit-timetable-modal',
  templateUrl: './edit-timetable-modal.component.html',
  styleUrls: ['./edit-timetable-modal.component.scss']
})

export class EditTimetableModalComponent {
  editTimetableForm: FormGroup;
  placeholders = {
    groupName: 'Назва групи',
    subjectName: 'Назва предмету',
    startDate: 'Дата початку',
    startTime: 'Час початку',
    endDate: 'Дата закінчення',
    endTime: 'Час закінчення'
  };
  groupDictionary = {};
  subjectDictionary = {};
  groupValues = [];
  subjectValues = [];
  title = 'Редагувати розклад';
  btnEdit = 'Редагувати';
  btnCancel = 'Закрити';

  constructor(public dialogRef: MatDialogRef<EditTimetableModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private delUpdateService: UpdateDeleteEntityService,
              private formBuilder: FormBuilder, private timetableService: TimeTableService) {
    this.loadGroupsAndSubjects();
    this.createForm();
  }

  loadGroupsAndSubjects() {
    this.timetableService.getGroupsAndSubjects().subscribe(data => {
      data[0].forEach(item => this.groupDictionary[item.group_id] = item.group_name);
      this.groupValues = Object.values(this.groupDictionary);
      data[1].forEach(item => this.subjectDictionary[item.id] = item.name);
      this.subjectValues = Object.values(this.subjectDictionary);
    });
  }

  createForm(): void {
    const groupName = this.data[1];
    const subjectName = this.data[2];
    const startDate = this.data[3];
    const startTime = this.data[4];
    const endDate = this.data[5];
    const endTime = this.data[6];
    this.editTimetableForm = this.formBuilder.group({
      groupName: [groupName],
      subjectName: [subjectName],
      startDate: [startDate],
      startTime: [startTime],
      endDate: [endDate],
      endTime: [endTime],
    });
  }

  editTimetable() {
    const groupName = this.editTimetableForm.get('groupName').value;
    const subjectName = this.editTimetableForm.get('subjectName').value;
    const start_date = this.editTimetableForm.get('startDate').value;
    const start_time = this.editTimetableForm.get('startTime').value;
    const end_date = this.editTimetableForm.get('endDate').value;
    const end_time = this.editTimetableForm.get('endTime').value;
    const keysOfGroupDictionary = Object.keys(this.groupDictionary);
    const keysOfSubjectDictionary = Object.keys(this.subjectDictionary);
    const entityName = 'Timetable';
    const timetableId = this.data[0];
    let group_id = 0;
    let subject_id = 0;
    for (let i = 0; i < keysOfGroupDictionary.length; i++) {
      if (this.groupValues[i] === groupName) {
        group_id = +keysOfGroupDictionary[i];
        break;
      }
    }
    for (let i = 0; i < keysOfSubjectDictionary.length; i++) {
      if (this.subjectValues[i] === subjectName) {
        subject_id = +keysOfSubjectDictionary[i];
        break;
      }
    }
    console.log(group_id);
    console.log(subject_id);
    this.delUpdateService.updateEntity(timetableId, entityName, {group_id, subject_id, start_date, start_time, end_date, end_time}).subscribe(
      (updatedTimetableResponse) => {
        const updatedTimetable = updatedTimetableResponse[0];
        updatedTimetable.group_id = this.groupDictionary[updatedTimetable.group_id];
        updatedTimetable.subject_id = this.subjectDictionary[updatedTimetable.subject_id];
        this.delUpdateService.passUpdatedTimetable(updatedTimetable);
        this.dialogRef.close();
      },
      (err) => console.log(err)
    );

  }
}
