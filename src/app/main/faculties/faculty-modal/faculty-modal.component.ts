import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FacultyService} from '../faculty.service';

@Component({
  selector: 'app-faculty-modal',
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
  errorRequired = 'Необхідно заповнити дане поле(мін. 3 символи)';
  errorRequiredInformation = 'Необхідно заповнити дане поле(мін. 5 символів)';

  constructor(public dialogRef: MatDialogRef<FacultyModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private facultyService: FacultyService,
              private fb: FormBuilder){
    this.facultyForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      description: [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  addFaculty() {
  const faculty_name = this.facultyForm.get('name').value;
  const faculty_description = this.facultyForm.get('description').value;
  this.facultyService.addFaculty({faculty_name,  faculty_description}).subscribe(
    (resp) => {
      this.facultyService.passAdded(resp[0]);
      this.isFacultyAdded = true;
    },
    err => {
      this.errRequestMsg = 'Помилка, можливо даний факультет вже існує';
    });
  }
}
