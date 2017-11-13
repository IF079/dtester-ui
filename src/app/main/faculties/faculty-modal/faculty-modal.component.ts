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
  placeholders = {
    name: 'Назва Факультету',
    description: 'Опис Факультету'
  };
  btnAdd = 'Додати Факультет';
  errorRequired = 'Необхідно заповнити дане поле';

  constructor(public dialogRef: MatDialogRef<FacultyModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private facultyService: FacultyService,
              private fb: FormBuilder){
    this.facultyForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  addFaculty() {
  const faculty_name = this.facultyForm.get('name').value;
  const faculty_description = this.facultyForm.get('description').value;
  this.facultyService.addFaculty({faculty_name,  faculty_description}).subscribe(
    (resp) => {
      this.facultyService.passAdded(resp[0]);
      this.dialogRef.close();
    },
    err => console.log(err)
  );
}
}
