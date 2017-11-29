import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';

import {UpdateDeleteEntityService} from '../update-delete-entity.service';

@Component({
  selector: 'dtest-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html'
})

export class DeleteConfirmModalComponent {
  btnConfirmYes = 'Так';
  btnConfirmNo = 'Ні';
  btnClose = 'Закрити';
  errorMsg;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DeleteConfirmModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private delUpdateService: UpdateDeleteEntityService) {
  }

  deleteItem() {
    const id = this.data.item[0];
    const entityName = this.data.entityName;
    this.delUpdateService.deleteEntity(id, entityName).subscribe(
      () => {
        this.delUpdateService.passDeleted(this.data.item);
        this.dialogRef.close();
      },
      () => {
        this.errorMsg = 'Виникла помилка при видаленні даних. Дані цього запису використовуються в інших сутностях. Або виникла проблема\n' +
          '  зі з\'єднанням на сервері';
      }
    );
  }
}

