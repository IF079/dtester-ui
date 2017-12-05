import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubjectDto} from '../subject-classes/subject-dto';
import {UpdateDeleteEntityService} from '../../entity-table/updateDeleteEntityService/update-delete-entity.service';


@Component({
  selector: 'dtest-edit-subject-modal',
  templateUrl: './edit-subject-modal.component.html'
})

export class EditSubjectModalComponent {
  editSubjectForm: FormGroup;
  placeholders = {
    name: 'Назва предмету',
    description: 'Опис предмету'
  };
  btnEdit = 'Редагувати предмет';
  btnClose = 'Відмінити';
  errRequestMsg: string;
  constructor(public dialogRef: MatDialogRef<EditSubjectModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private delUpdateService: UpdateDeleteEntityService,
              private formBuilder: FormBuilder, ) {
    this.createForm();
  }

  createForm(): void {
    const name = this.data[1];
    const description = this.data[2];
    this.editSubjectForm = this.formBuilder.group({
      name: [name, Validators.required],
      description: [description, Validators.required]
    });
  }
  get name() {
    return this.editSubjectForm.get('name');
  }
  get description() {
    return this.editSubjectForm.get('description');
  }
  editEntityRecord() {
    const id = this.data[0];
    const entityName = 'Subject';
    const subject_name = this.editSubjectForm.get('name').value;
    const subject_description = this.editSubjectForm.get('description').value;
    this.delUpdateService.updateEntity(id, entityName,
      {subject_name, subject_description}).subscribe((subjectData: SubjectDto[]) => {
        this.delUpdateService.passUpdatedItem<SubjectDto[]>(subjectData);
        this.dialogRef.close();
      },
      err => {
        this.errRequestMsg = 'Даний предмет вже існує. Або відбулась інша помилка';
      });
  }
}