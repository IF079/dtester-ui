import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

import {SubjectService} from '../subject.service';

@Component({
  selector: 'app-subject-modal',
  templateUrl: './subject-modal.component.html',
  styleUrls: ['./subject-modal.component.scss']
})

export class SubjectModalComponent {
  subjectForm: FormGroup;
  placeholders = {
    name: 'Назва предмету',
    description: 'Опис предмету'
  };
  btnAdd = 'Додати предмет';

  constructor(public dialogRef: MatDialogRef<SubjectModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private subjectService: SubjectService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm(): void {
    this.subjectForm = this.formBuilder.group({
      name: '',
      description: ''
    });
  }

  addSubject() {
    const subject_name = this.subjectForm.get('name').value;
    const subject_description = this.subjectForm.get('description').value;
    this.subjectService.addSubject({subject_name,  subject_description}).subscribe(subject => {
        console.log(subject);
      },
      err => console.log(err)
    );
  }
}
