import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FacultyService} from '../faculty.service';
import {Faculty} from '../faculty';
import {UpdateDeleteEntityService} from '../../entity-table/updateDeleteEntityService/update-delete-entity.service';

@Component({
  selector: 'dtest-faculty-modal',
  templateUrl: './faculty-modal.component.html',
  styleUrls: ['./faculty-modal.component.scss']
})

export class FacultyModalComponent {
  facultyForm: FormGroup;
  successMsg = 'Факультет успішно добавлено в кінець списку';
  isFacultyAdded = false;
  placeholders = {
    name: 'Назва Факультету',
    description: 'Опис Факультету'
  };
  btnAdd = 'Додати Факультет';
  btnOk = 'Ок';
  errRequestMsg: string;
  errorRequired = 'Заповніть поле! (мін.3-макс.60 знаків)';
  errorRequiredInformation = 'Заповніть поле! (мін.3-макс.120 знаків)';

  constructor(public dialogRef: MatDialogRef<FacultyModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private facultyService: FacultyService,
              private fb: FormBuilder,
              private delUpdateService: UpdateDeleteEntityService
              ) {
    this.facultyForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(60)])],
      description: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(120)])]
    });
  }

  addFaculty() {
  const faculty_name = this.facultyForm.get('name').value;
  const faculty_description = this.facultyForm.get('description').value;
  this.facultyService.addFaculty({faculty_name,  faculty_description}).subscribe(
    (facultyData) => {
      this.delUpdateService.passInsertedItem<Faculty[]>(facultyData[0]);
      this.isFacultyAdded = true;
    },
    err => {
      this.errRequestMsg = 'Помилка, можливо даний факультет вже існує';
    });
  }
}
