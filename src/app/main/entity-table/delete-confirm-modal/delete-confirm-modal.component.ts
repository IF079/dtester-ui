import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';

import {UpdateDeleteEntityService} from '../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {InfoModalService} from '../../info-modal/info-modal.service';

@Component({
  selector: 'dtest-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html'
})

export class DeleteConfirmModalComponent {
  btnConfirmYes = 'Так';
  btnConfirmNo = 'Ні';
  btnClose = 'Закрити';
  errorMsg;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private delUpdateService: UpdateDeleteEntityService,
    private modal: InfoModalService
  ) {
  }

  deleteItem() {
    const id = this.data.item[0];
    const entityName = this.data.entityName;
    this.dialogRef.close();
    this.delUpdateService.deleteEntity(id, entityName).subscribe(
      (resp) => {
        this.delUpdateService.passDeleted(this.data.item);
        this.modal.openSuccessDialog('Запис успішно видалено!');
      },
      () => {
        this.modal.openErrorDialog('Виникла помилка при видаленні даних. Дані цього запису використовуються в інших сутностях. Або' +
          ' виникла проблема\n' + '  зі з\'єднанням на сервері');
      }
    );
  }
}

