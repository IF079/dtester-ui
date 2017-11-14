import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {SpecialityService} from '../speciality.service';
import {UpdateDeleteEntityService} from '../../entity-table/update-delete-entity.service';
import {Speciality} from '../speciality';
import {SpecialityDto} from '../speciality-dto';

@Component({
  selector: 'app-speciality-modal',
  templateUrl: 'speciality-modal.component.html',
  styleUrls: ['speciality-modal.component.scss']
})

export class SpecialityModalComponent {
  specialityForm: FormGroup;
  placeholders = {
    code: 'Код Спеціальності',
    name: 'Назва Спеціальності'
  };
  btnAdd = 'Додати';
  errorRequired = 'Заповніть поле!';
  errorCodePattern = 'Дані повинні бути вигляду (1.2345678)';
  title = 'Додати спеціальність';
  btnClose = 'Відмінити';

  constructor(public dialogRef: MatDialogRef<SpecialityModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public specialityService: SpecialityService,
              public fb: FormBuilder,
              public delUpdateService: UpdateDeleteEntityService) {
    this.createForm();
  }
  createForm(): void {
    this.specialityForm = this.fb.group({
      code: [null, [Validators.required, Validators.pattern(/^(([0-9]{1}\.)+([0-9]{7}))$/g)]],
      name: [null, Validators.required],
    });
  }

  addSpeciality(speciality) {
    this.specialityService.addSpeciality( {
      specialityCode: speciality.code,
      specialityName: speciality.name,
    }).subscribe(specialityData => {
      this.delUpdateService.passInsertedSpeciality(specialityData);
      this.dialogRef.close();
    });
  }
}
