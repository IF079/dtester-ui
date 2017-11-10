import {Injectable} from '@angular/core';
import {MatDialog, MatPaginatorIntl, PageEvent} from '@angular/material';

import {InfoModalComponent} from '../info-modal/info-modal.component';

@Injectable()
export class InfoModalService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  openErrorDialog(text: string = 'Щось пішло не так. Повторіть, будь ласка, спробу пізніше.', callback: Function = null) {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      width: '350px',
      data: {
        type: 'error',
        title: 'Помилка',
        text: text
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (callback) {
        callback();
      }
    });
  }

  openInfoDialog(text: string, callback: Function = null) {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      width: '350px',
      data: {
        type: 'info',
        title: 'Успіх',
        text: text
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (callback) {
        callback();
      }
    });
  }

}
