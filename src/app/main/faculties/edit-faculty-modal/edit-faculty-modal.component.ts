import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Faculty} from '../../faculties/faculty';
import {UpdateDeleteEntityService} from '../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {InfoModalService} from '../../info-modal/info-modal.service';
import {generalConst} from '../../shared/constants/general-constants';

@Component({
  selector: 'dtest-edit-faculty-modal',
  templateUrl: './edit-faculty-modal.component.html',
  styleUrls: ['./edit-faculty-modal.component.scss']
})

export class EditFacultyModalComponent {
  facultyForm: FormGroup;
  placeholders = {
    name: 'Назва факультету',
    description: 'Опис факультету'
  };
  btnUpd = 'Редагувати';
  btnClose = 'Відмінити';
  title = 'Редагувати факультет';
  errorRequired = 'Заповніть поле!';

  constructor(public dialogRef: MatDialogRef<EditFacultyModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public delUpdateService: UpdateDeleteEntityService,
              private fb: FormBuilder,
              private modalService: InfoModalService) {
    this.createForm();
  }

  createForm(): void {
    this.facultyForm = this.fb.group({
      name: [this.data[1], Validators.required],
      description: [this.data[2], Validators.required],
    });
  }

  editEntityRecord() {
    this.dialogRef.close();
    const id = this.data[0];
    const entityName = 'Faculty';
    const faculty_name = this.facultyForm.get('name').value;
    const faculty_description = this.facultyForm.get('description').value;
    this.delUpdateService.updateEntity(id, entityName,
      {faculty_name, faculty_description}).subscribe((facultyData: Faculty[]) => {
        this.delUpdateService.passUpdatedItem<Faculty[]>(facultyData);
      this.modalService.openSuccessDialog(generalConst.updateMsg);
      }, () => {
      this.modalService.openErrorDialog(generalConst.errorMsg);
      }
    );
  }
}
