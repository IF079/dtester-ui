import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {SubjectService} from '../subject.service';
import {UpdateDeleteEntityService} from '../../entity-table/update-delete-entity.service';

@Component({
  selector: 'app-subject-modal',
  templateUrl: './subject-modal.component.html',
  styleUrls: ['./subject-modal.component.scss']
})

export class SubjectModalComponent {
  subjectForm: FormGroup;
  successMsg = 'Предмет додано успішно';
  isSubjectAdded = false;
  placeholders = {
    name: 'Назва предмету',
    description: 'Опис предмету'
  };
  btnAdd = 'Додати предмет';
  errorRequired = 'Заповніть поле!';
  btnClose = 'Відмінити';
  btnOk = 'Ок';
  errRequestMsg: string;

  constructor(public dialogRef: MatDialogRef<SubjectModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private subjectService: SubjectService,
              private formBuilder: FormBuilder, private delUpdateService: UpdateDeleteEntityService) {
    this.createForm();
  }

  createForm(): void {
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get name() {
    return this.subjectForm.get('name');
  }

  get description() {
    return this.subjectForm.get('description');
  }

  addSubject() {
    const subject_name = this.subjectForm.get('name').value;
    const subject_description = this.subjectForm.get('description').value;
    this.subjectService.addSubject({subject_name, subject_description}).subscribe(subject => {

        this.delUpdateService.passInsertedSubject(subject);
        this.isSubjectAdded = true;
      },
      err => {
        this.errRequestMsg = 'Даний предмет вже існує. Або відбулась інша помилка';
      }
    );
  }
}
