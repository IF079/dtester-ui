import {Component} from '@angular/core';
import {Validators} from '@angular/forms';

import {SpecialityModalComponent} from '../../speciality/speciality-modal/speciality-modal.component';

@Component({
  selector: 'app-edit-speciality-modal',
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
    const id = this.data[0];
    const entityName = 'Speciality';
    const speciality_code = this.specialityForm.get('code').value;
    const speciality_name = this.specialityForm.get('name').value;
    this.delUpdateService.updateEntity(id, entityName,
      {speciality_code, speciality_name}).subscribe(specialityData => {
        this.delUpdateService.passUpdatedSpeciality(specialityData);
        this.dialogRef.close();
      },
      err => console.log(err)
    );
  }
}
