import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FacultyService} from '../faculty.service';
import {InfoModalService} from '../../info-modal/info-modal.service';
import {Faculty} from '../faculty';
import {UpdateDeleteEntityService} from '../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {generalConst} from '../../shared/constants/general-constants';

@Component({
  selector: 'dtest-faculty-modal',
  templateUrl: './add-faculty-modal.component.html',
  styleUrls: ['./add-faculty-modal.component.scss']
})

export class FacultyModalComponent {
  facultyForm: FormGroup;
  placeholders = {
    name: 'Назва Факультету',
    description: 'Опис Факультету'
  };
  title = 'Додати факультет';
  btnAdd = 'Додати';
  btnClose = 'Відмінити';
  errRequestMsg: string;
  errorRequired = 'Заповніть поле! (мін.3-макс.60 знаків)';
  errorRequiredInformation = 'Заповніть поле! (мін.3-макс.120 знаків)';

  constructor(public dialogRef: MatDialogRef<FacultyModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private facultyService: FacultyService,
              private fb: FormBuilder,
              private delUpdateService: UpdateDeleteEntityService,
              private modalService: InfoModalService
              ) {
    this.facultyForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(60)])],
      description: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(120)])]
    });
  }

  addFaculty() {
  const faculty_name = this.facultyForm.get('name').value;
  const faculty_description = this.facultyForm.get('description').value;
  this.dialogRef.close();
  this.facultyService.addFaculty({faculty_name,  faculty_description}).subscribe(
    (facultyData) => {
      this.delUpdateService.passInsertedItem<Faculty[]>(facultyData);
      this.modalService.openSuccessDialog(generalConst.addMsg);
    }, () => this.modalService.openErrorDialog(generalConst.errorMsgForFaculty));
  }
}
