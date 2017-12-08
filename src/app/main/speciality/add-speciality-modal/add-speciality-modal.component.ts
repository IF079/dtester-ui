import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {SpecialityService} from '../speciality-service/speciality.service';
import {UpdateDeleteEntityService} from '../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {SpecialityDto} from '../speciality-classes/speciality-dto';
import {InfoModalService} from '../../info-modal/info-modal.service';
import {generalConst} from '../../shared/constants/general-constants';

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
  btnClose = 'Відмінити';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<SpecialityModalComponent>,
              public specialityService: SpecialityService,
              protected fb: FormBuilder,
              protected delUpdateService: UpdateDeleteEntityService,
              protected modalService: InfoModalService) {
    this.createForm();
  }
  createForm(): void {
    this.specialityForm = this.fb.group({
      code: [null, [Validators.required, Validators.pattern(/^(([0-9]{1}\.)+([0-9]{7}))$/g)]],
      name: [null, Validators.required],
    });
  }

  addSpeciality(speciality) {
    this.dialogRef.close();
    this.specialityService.addSpeciality( {
      specialityCode: speciality.code,
      specialityName: speciality.name,
    }).subscribe(specialityData => {
      this.delUpdateService.passInsertedItem<SpecialityDto[]>(specialityData);
      this.modalService.openSuccessDialog(generalConst.addMsg);
    },
      () => {
        this.modalService.openErrorDialog(generalConst.errorMsg);
      });
  }
}
