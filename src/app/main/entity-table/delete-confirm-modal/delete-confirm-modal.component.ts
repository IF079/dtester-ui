import {Component, Inject, OnInit, OnChanges} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UpdateDeleteEntityService} from '../update-delete-entity.service';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html'
})

export class DeleteConfirmModalComponent {
  editEntityForm: FormGroup;
  dataForUpdate: any;
  placeholders = {
    name: 'Назва предмету',
    description: 'Опис предмету'
  };
  btnConfirmYes = 'Так';
  btnConfirmNo = 'Ні';

  constructor(public dialogRef: MatDialogRef<DeleteConfirmModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private delUpdateService: UpdateDeleteEntityService) {
  }

  deleteItem() {
    const id = this.data.item[0];
    const entityName = this.data.entityName;
    this.delUpdateService.deleteEntity(id, entityName).subscribe(
      (resp) => {
        this.delUpdateService.passDeleted(this.data.item);
        this.dialogRef.close();
      },
      (err) => console.log(err)
    );
  }
}

