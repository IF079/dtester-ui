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
              private formBuilder: FormBuilder, ) {
    this.createForm();
  }

  createForm(): void {
    const name = this.data[1];
    const description = this.data[2];
    this.editEntityForm = this.formBuilder.group({name
      , description});
  }

  ngOnChanges() {

  }

  editEntityRecord() {
    const id = this.data[0];
    const subject_name = this.editEntityForm.get('name').value;
    const subject_description = this.editEntityForm.get('description').value;
    this.dataForUpdate = 'Something';
    this.dialogRef.close();
    this.delUpdateService.updateEntity(id, 'Subject',
      {subject_name, subject_description}).subscribe(response => {
        this.delUpdateService.passUpdated(response);
      },
      err => console.log(err)
    );
  }
}
