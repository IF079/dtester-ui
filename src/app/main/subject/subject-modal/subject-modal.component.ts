import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SubjectService} from '../subject.service';
import {FormBuilder, FormGroup} from '@angular/forms';

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
    const name = this.subjectForm.get('name').value;
    const description = this.subjectForm.get('description').value;

    console.log(name);
    console.log(description);
    this.subjectService.addSubject({subject_name: name, subject_description: description}).subscribe(subject => {
        console.log(subject);
      },
      err => console.log(err)
    );
  }


}
