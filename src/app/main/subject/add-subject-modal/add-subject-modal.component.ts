import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {SubjectService} from '../subject-service/subject.service';
import {UpdateDeleteEntityService} from '../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {SubjectDto} from '../subject-classes/subject-dto';

@Component({
  selector: 'dtest-add-subject-modal',
  templateUrl: './add-subject-modal.component.html',
  styleUrls: ['./add-subject-modal.component.scss']
})

export class AddSubjectModalComponent {
  subjectForm: FormGroup;
  successMsg = 'Предмет додано успішно. Оновіть сторінку, щоб побачити зміни.';
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

  constructor(public dialogRef: MatDialogRef<AddSubjectModalComponent>,
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
  isFormValid(): boolean {
    return this.subjectForm.valid;
  }
  get name() {
    return this.subjectForm.get('name');
  }

  get description() {
    return this.subjectForm.get('description');
  }

  addSubject() {
    const subject_name = this.name.value;
    const subject_description = this.description.value;
    this.subjectService.addSubject({subject_name, subject_description}).subscribe(subject => {
        this.delUpdateService.passInsertedItem<SubjectDto>(subject);
        this.isSubjectAdded = true;
      },
      err => {
        this.errRequestMsg = 'Даний предмет вже існує. Або відбулась інша помилка';
      }
    );
  }
}
