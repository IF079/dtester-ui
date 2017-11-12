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

  /*addFaculty(faculty) {
    this.facultyService.addFaculty( {
      facultyName: faculty.name,
      facultyDescription: faculty.description
    }).subscribe((facultyData) => {
      this.dialogRef.close(facultyData);
    });

  }
}*/
addFaculty() {
  const faculty_name = this.facultyForm.get('name').value;
  const faculty_description = this.facultyForm.get('description').value;
  this.facultyService.addFaculty({faculty_name,  faculty_description}).subscribe(faculty => {
      console.log(faculty);
      this.dialogRef.close(faculty);
    },
    err => console.log(err)
  );
}
}
