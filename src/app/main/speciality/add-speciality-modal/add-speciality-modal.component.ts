import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';

import {SpecialityService} from '../speciality-service/speciality.service';
import {UpdateDeleteEntityService} from '../../entity-table/update-delete-entity.service';
import {SpecialityDto} from '../speciality-entity/speciality-dto';

@Component({
  selector: 'dtest-speciality-modal',
  templateUrl: 'add-speciality-modal.component.html',
  styleUrls: ['add-speciality-modal.component.scss']
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
  titleSuccess = 'Запис успішно додано';
  btnClose = 'Відмінити';
  errorMessage = '';
  btnOk = 'Ок';
  isAdded = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public specialityService: SpecialityService,
              protected fb: FormBuilder,
              protected delUpdateService: UpdateDeleteEntityService) {
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
      this.delUpdateService.passInsertedItem<SpecialityDto[]>(specialityData);
      this.isAdded = true;
    },
      () => {
      this.errorMessage = 'Спеціальність з такими даними вже існує';
      });
  }
}
