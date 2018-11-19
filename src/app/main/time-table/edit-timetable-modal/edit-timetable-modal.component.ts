import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TimeTable} from '../timetable-classes/time-table';

import {TimeTableService} from '../timetable-service/time-table.service';
import {UpdateDeleteEntityService} from '../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {InfoModalService} from '../../info-modal/info-modal.service';
import {generalConst} from '../../shared/constants/general-constants';

@Component({
  selector: 'dtest-edit-timetable-modal',
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
  errorRequired = 'Заповніть поле!';
  errRequestMsg: string;
  groupDictionary = {};
  subjectDictionary = {};
  groupValues = [];
  subjectValues = [];
  title = 'Редагувати розклад';
  btnEdit = 'Редагувати';
  btnCancel = 'Закрити';

  constructor(public dialogRef: MatDialogRef<EditTimetableModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private delUpdateService: UpdateDeleteEntityService,
              private formBuilder: FormBuilder, private timetableService: TimeTableService,
              private modalService: InfoModalService) {
    this.loadGroupsAndSubjects();
    this.createForm();
  }

  loadGroupsAndSubjects() {
    this.timetableService.getGroupsAndSubjects().subscribe(data => {
      data[0].forEach(groupItem => this.groupDictionary[groupItem.group_id] = groupItem.group_name);
      this.groupValues = Object.values(this.groupDictionary);
      data[1].forEach(subjectItem => this.subjectDictionary[subjectItem.id] = subjectItem.name);
      this.subjectValues = Object.values(this.subjectDictionary);
    });
  }

  createForm(): void {
    const [, groupName, subjectName, startDate, startTime, endDate, endTime] = this.data;
    this.editTimetableForm = this.formBuilder.group({
      groupName: [groupName, Validators.required],
      subjectName: [subjectName, Validators.required],
      startDate: [startDate, Validators.required],
      startTime: [startTime, Validators.required],
      endDate: [endDate, Validators.required],
      endTime: [endTime, Validators.required],
    });
  }

  get groupName() {
    return this.editTimetableForm.get('groupName');
  }

  get subjectName() {
    return this.editTimetableForm.get('subjectName');
  }

  get startTime() {
    return this.editTimetableForm.get('startTime');
  }

  get startDate() {
    return this.editTimetableForm.get('startDate');
  }

  get endDate() {
    return this.editTimetableForm.get('endDate');
  }

  get endTime() {
    return this.editTimetableForm.get('endTime');
  }

  isFormValid(): boolean {
    return this.editTimetableForm.valid;
  }

  editTimetable() {
    const groupName = this.groupName.value;
    const subjectName = this.subjectName.value;
    const start_date = this.startDate.value;
    const start_time = this.startTime.value;
    const end_date = this.endDate.value;
    const end_time = this.endTime.value;
    const keysOfGroupDictionary = Object.keys(this.groupDictionary);
    const keysOfSubjectDictionary = Object.keys(this.subjectDictionary);
    const entityName = 'TimeTable';
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
    this.dialogRef.close();
    this.delUpdateService.updateEntity(timetableId, entityName, {
      group_id,
      subject_id,
      start_date,
      start_time,
      end_date,
      end_time
    }).subscribe(
      (updatedTimetableResponse: TimeTable[]) => {
        updatedTimetableResponse.forEach((timeTableItem)  => {
          timeTableItem.group_id = this.groupDictionary[timeTableItem.group_id];
          timeTableItem.subject_id = this.subjectDictionary[timeTableItem.subject_id];
        });
        this.delUpdateService.passUpdatedItem<TimeTable[]>(updatedTimetableResponse);
        this.modalService.openSuccessDialog(generalConst.updateMsg);
      },
      (err) => {
        this.modalService.openErrorDialog(generalConst.errMsgForTimeTables);
      }
    );
  }
}
