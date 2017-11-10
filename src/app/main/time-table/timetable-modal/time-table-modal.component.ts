import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

import {TimeTableService} from '../time-table.service';

@Component({
  selector: 'app-time-table-modal',
  templateUrl: './time-table-modal.component.html'
})

export class TimeTableModalComponent {
  timeTableForm: FormGroup;
  placeholders = {
    name: 'Назва предмету',
    description: 'Опис предмету'
  };
  btnAdd = 'Додати предмет';

  constructor(public dialogRef: MatDialogRef<TimeTableModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private timeTableService: TimeTableService, private formBuilder: FormBuilder) {
    this.createForm();
    console.log(this.data);
  }

  createForm(): void {
    this.timeTableForm = this.formBuilder.group({
      name: '',
      description: ''
    });
  }

  addTimeTable () {
       this.timeTableService.addTimeTable({}).subscribe(subject => {
        console.log(subject);
      },
      err => console.log(err)
    );
  }
}
