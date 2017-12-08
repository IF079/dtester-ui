import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {TimeTableService} from '../timetable-service/time-table.service';
import {UpdateDeleteEntityService} from '../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {TimeTable} from '../timetable-classes/time-table';

@Component({
  selector: 'dtest-add-time-table-modal',
  templateUrl: './add-time-table-modal.component.html',
  styleUrls: ['./add-time-table-modal.component.scss']
})

export class AddTimeTableModalComponent implements OnInit {
  timeTableForm: FormGroup;
  subjectValues = [];
  groupValues = [];
  groupDictionary = {};
  subjectDictionary = {};
  isTimeTableAdded = false;
  successMsg = 'Розклад додано успішно. Оновіть сторінку, щоб побачити зміни.';
  errorRequired = 'Заповніть поле!';
  errRequestMsg: string;
  placeholders = {
    groupName: 'Назва групи',
    subjectName: 'Назва предмету',
    dateOfStart: 'Виберіть дату початку',
    timeOfStart: 'Виберіть час початку',
    dateOfEnd: 'Виберіть дату закінчення',
    timeOfEnd: 'Виберіть час закінчення'
  };
  btnAdd = 'Додати розклад';
  btnClose = 'Відмінити';
  btnOk = 'Ок';

  constructor(public dialogRef: MatDialogRef<AddTimeTableModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private timetableService: TimeTableService,
              private formBuilder: FormBuilder, private delUpdateService: UpdateDeleteEntityService) {
    this.createForm();
    this.loadGroupsAndSubjects();
  }

  createForm(): void {
    this.subjectValues = Object.values(this.data.subjectDictionary);
    this.groupValues = Object.values(this.data.groupDictionary);
    this.timeTableForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      subjectName: ['', Validators.required],
      dateOfStart: ['', Validators.required],
      timeOfStart: ['', Validators.required],
      dateOfEnd: ['', Validators.required],
      timeOfEnd: ['', Validators.required]
    });
  }
  loadGroupsAndSubjects() {
    this.timetableService.getGroupsAndSubjects().subscribe(data => {
      data[0].forEach(groupItem => this.groupDictionary[groupItem.group_id] = groupItem.group_name);
      this.groupValues = Object.values(this.groupDictionary);
      data[1].forEach(subjectItem => this.subjectDictionary[subjectItem.id] = subjectItem.name);
      this.subjectValues = Object.values(this.subjectDictionary);
    });
  }

  get groupName() {
    return this.timeTableForm.get('groupName');
  }

  get subjectName() {
    return this.timeTableForm.get('subjectName');
  }

  get dateOfStart() {
    return this.timeTableForm.get('dateOfStart');
  }

  get timeOfStart() {
    return this.timeTableForm.get('timeOfStart');
  }

  get dateOfEnd() {
    return this.timeTableForm.get('dateOfEnd');
  }

  get timeOfEnd() {
    return this.timeTableForm.get('timeOfEnd');
  }

  isFormValid(): boolean {
    return this.timeTableForm.valid;
  }

  ngOnInit() {
  }

  addTimeTable() {
    const groupName = this.groupName.value;
    const subjectName = this.subjectName.value;
    const start_date = this.dateOfStart.value;
    const start_time = this.timeOfStart.value;
    const end_date = this.dateOfEnd.value;
    const end_time = this.timeOfEnd.value;
    const keysOfSubjectDictionary = Object.keys(this.data.subjectDictionary);
    const keysOfGroupDictionary = Object.keys(this.data.groupDictionary);
    let subject_id = 0;
    let group_id = 0;
    for (let i = 0; i < keysOfSubjectDictionary.length; i++) {
      if (this.subjectValues[i] === subjectName) {
        subject_id = +keysOfSubjectDictionary[i];
        break;
      }
    }
    for (let i = 0; i < keysOfGroupDictionary.length; i++) {
      if (this.groupValues[i] === groupName) {
        group_id = +keysOfGroupDictionary[i];
        break;
      }
    }

    this.timetableService.addTimeTable({group_id, subject_id, start_date, start_time, end_date, end_time}).subscribe(
      (timeTableData: TimeTable[]) => {
        timeTableData.forEach((timeTableItem)  => {
          timeTableItem.group_id = this.groupDictionary[timeTableItem.group_id];
          timeTableItem.subject_id = this.subjectDictionary[timeTableItem.subject_id];
        });
        this.delUpdateService.passInsertedItem<TimeTable[]>(timeTableData);
        this.isTimeTableAdded = true;
      },
      (err) => {
        this.errRequestMsg = `Розклад для такої групи і предмету вже можливо існує, дати розкладу такі вже є,
        або виникла інша помилка на сервері`;
      }
    );


  }
}
