import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Faculty} from '../../faculties/faculty';
import {UpdateDeleteEntityService} from '../update-delete-entity.service';

@Component({
  selector: 'dtest-edit-faculty-modal',
  templateUrl: './edit-faculty-modal.component.html',
  styleUrls: ['./edit-faculty-modal.component.scss']
})

export class EditFacultyModalComponent {
  facultyForm: FormGroup;
  isUpdated = false;
  errorMessage = '';
  btnOk = 'Ок';
  placeholders = {
    name: 'Назва факультету',
    description: 'Опис факультету'
  };
  btnUpd = 'Редагувати';
  btnClose = 'Відмінити';
  title = 'Редагувати факультет';
  titleUpdated = 'Запис успішно відредаговано';
  errorRequired = 'Заповніть поле!';

  constructor(public dialogRef: MatDialogRef<EditFacultyModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public delUpdateService: UpdateDeleteEntityService,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm(): void {
    this.facultyForm = this.fb.group({
      name: [this.data[1], Validators.required],
      description: [this.data[2], Validators.required],
    });
  }

  editEntityRecord() {
    const id = this.data[0];
    const entityName = 'Faculty';
    const faculty_name = this.facultyForm.get('name').value;
    const faculty_description = this.facultyForm.get('description').value;
    this.delUpdateService.updateEntity(id, entityName,
      {faculty_name, faculty_description}).subscribe((facultyData: Faculty[]) => {
        this.delUpdateService.passUpdatedEntity<Faculty[]>(facultyData);
        this.isUpdated = true;
      }, () => {
        this.errorMessage = 'Факультет з такими даними вже існує';
      }
    );
  }
}
