import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

import {TimeTableService} from '../time-table.service';

@Component({
  selector: 'app-time-table-modal',
  templateUrl: './time-table-modal.component.html',
  styleUrls: ['./time-table-modal.component.scss']
})

export class TimeTableModalComponent implements OnInit {
  timeTableForm: FormGroup;
  subjectValues = [];
  groupValues = [];
  placeholders = {
    groupName: 'Назва групи',
    subjectName: 'Назва предмету',
    dateOfStart: 'Дата початку в форматі 2017-11-09',
    timeOfStart: 'Час початку в форматі 10:22:00',
    dateOfEnd: 'Дата закінчення в форматі 2018-10-08',
    timeOfEnd: 'Час закінчення в форматі 10:22:00'
  };
  btnAdd = 'Додати предмет';

  constructor(public dialogRef: MatDialogRef<TimeTableModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private timeTableService: TimeTableService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm(): void {
    this.subjectValues = Object.values(this.data.subjectDictionary);
    this.groupValues = Object.values(this.data.groupDictionary);
    this.timeTableForm = this.formBuilder.group({
      groupName: [''],
      subjectName: [''],
      dateOfStart: [''],
      timeOfStart: [''],
      dateOfEnd: [''],
      timeOfEnd: ['']
    });
  }

  ngOnInit() {
  }

  addTimeTable() {

    const groupName = this.timeTableForm.get('groupName').value;
    const subjectName = this.timeTableForm.get('subjectName').value;
    const start_date = this.timeTableForm.get('dateOfStart').value;
    const start_time = this.timeTableForm.get('timeOfStart').value;
    const end_date = this.timeTableForm.get('dateOfEnd').value;
    const end_time = this.timeTableForm.get('timeOfEnd').value;
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
      (resp) => console.log(resp),
      (err) => console.log(err)
    );


  }
}
