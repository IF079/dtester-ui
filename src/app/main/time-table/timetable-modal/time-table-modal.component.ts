import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {TimeTableService} from '../time-table.service';
import {UpdateDeleteEntityService} from '../../entity-table/update-delete-entity.service';

@Component({
  selector: 'dtest-time-table-modal',
  templateUrl: './time-table-modal.component.html',
  styleUrls: ['./time-table-modal.component.scss']
})

export class TimeTableModalComponent implements OnInit {
  timeTableForm: FormGroup;
  subjectValues = [];
  groupValues = [];
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

  constructor(public dialogRef: MatDialogRef<TimeTableModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private timeTableService: TimeTableService,
              private formBuilder: FormBuilder, private delUpdateService: UpdateDeleteEntityService) {
    this.createForm();
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

    this.timeTableService.addTimeTable({group_id, subject_id, start_date, start_time, end_date, end_time}).subscribe(
      (resp) => {
        this.delUpdateService.passInsertedTimetable(resp);
        this.isTimeTableAdded = true;
      },
      (err) => {
        this.errRequestMsg = `Розклад для такої групи і предмету вже можливо існує, дати розкладу такі вже є,
        або виникла інша помилка на сервері`;
      }
    );


  }
}
