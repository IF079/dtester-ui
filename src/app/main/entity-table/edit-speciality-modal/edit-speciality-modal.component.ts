import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {UpdateDeleteEntityService} from '../update-delete-entity.service';

@Component({
  selector: 'app-edit-speciality-modal',
  templateUrl: './edit-speciality-modal.component.html',
  styleUrls: ['./edit-speciality-modal.component.scss']
})

export class EditSpecialityModalComponent {
  specialityForm: FormGroup;
  placeholders = {
    code: 'Код Спеціальності',
    name: 'Назва Спеціальності'
  };
  btnUpd = 'Редагувати';
  btnClose = 'Відмінити';
  title = 'Редагувати спеціальність';
  errorRequired = 'Заповніть поле!';
  errorCodePattern = 'Дані повинні бути вигляду (1.2345678)';

  constructor(public dialogRef: MatDialogRef<EditSpecialityModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public delUpdateService: UpdateDeleteEntityService,
              private fb: FormBuilder) {
    this.createForm();
  }
  createForm(): void {
    this.specialityForm = this.fb.group({
      code: [this.data[1], Validators.compose([Validators.required, Validators.pattern(/^(([0-9]{1}\.)+([0-9]{7}))$/g)])],
      name: [this.data[2], Validators.required],
    });
  }

  editEntityRecord() {
    const id = this.data[0];
    const entityName = 'Speciality';
    const speciality_code = this.specialityForm.get('code').value;
    const speciality_name = this.specialityForm.get('name').value;
    this.delUpdateService.updateEntity(id, entityName,
      {speciality_code, speciality_name}).subscribe(response => {
        this.delUpdateService.passUpdatedSpeciality(response);
        this.dialogRef.close();
      },
      err => console.log(err)
    );
  }
}
