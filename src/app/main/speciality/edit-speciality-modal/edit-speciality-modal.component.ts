import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';

import {SpecialityDto} from '../speciality-classes/speciality-dto';
import {SpecialityModalComponent} from '../add-speciality-modal/add-speciality-modal.component';
import {SpecialityService} from '../speciality-service/speciality.service';
import {UpdateDeleteEntityService} from '../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {generalConst} from '../../shared/constants/general-constants';

@Component({
  selector: 'dtest-edit-speciality-modal',
  templateUrl: './edit-speciality-modal.component.html',
  styleUrls: ['./edit-speciality-modal.component.scss']
})

export class EditSpecialityModalComponent extends SpecialityModalComponent {
  btnUpd = 'Редагувати';
  title = 'Редагувати спеціальність';

  createForm(): void {
    this.specialityForm = this.fb.group({
      code: [this.data[1], [Validators.required, Validators.pattern(/^(([0-9]{1}\.)+([0-9]{7}))$/g)]],
      name: [this.data[2], Validators.required],
    });
  }

  editEntityRecord() {
    this.dialogRef.close();
    const id = this.data[0];
    const entityName = 'Speciality';
    const speciality_code = this.specialityForm.get('code').value;
    const speciality_name = this.specialityForm.get('name').value;
    this.delUpdateService.updateEntity(id, entityName,
      {speciality_code, speciality_name}).subscribe((specialityData: SpecialityDto[]) => {
        this.delUpdateService.passUpdatedItem<SpecialityDto[]>(specialityData);
        this.modalService.openSuccessDialog(generalConst.updateMsg);
      },
      () => {
        this.modalService.openErrorDialog(generalConst.errorUpdateMsg);
      }
    );
  }
}
