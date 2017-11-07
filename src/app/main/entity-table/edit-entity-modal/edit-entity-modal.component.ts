import {Component, Inject, OnInit, OnChanges} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UpdateDeleteEntityService} from '../update-delete-entity.service';

@Component({
  selector: 'app-entity-modal',
  templateUrl: './edit-entity-modal.component.html'
})

export class EditEntityModalComponent implements OnChanges {
  editEntityForm: FormGroup;
  dataForUpdate: any;
  placeholders = {
    name: 'Назва предмету',
    description: 'Опис предмету'
  };
  btnEdit = 'Редагувати предмет';

  constructor(public dialogRef: MatDialogRef<EditEntityModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private delUpdateService: UpdateDeleteEntityService,
              private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm(): void {
    console.log(this.data);
    const name = this.data[1];
    console.log(this.data[1]);
    const description = this.data[2];
    this.editEntityForm = this.formBuilder.group({name
      , description});
  }

  ngOnChanges() {

  }

  editEntityRecord() {
    const id = this.data[0];
    console.log(this.data[0]);
    const name = this.editEntityForm.get('name').value;
    const description = this.editEntityForm.get('description').value;
    this.dataForUpdate = 'Something';
    this.delUpdateService.updateEntity(id, 'Subject',
      {
        subject_name: name,
        subject_description: description
      }).subscribe(response => {
        console.log(response);
        this.data = {id, name, description};
      },
      err => console.log(err));
  }
}
