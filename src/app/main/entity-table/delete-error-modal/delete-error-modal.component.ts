import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {UpdateDeleteEntityService} from '../update-delete-entity.service';

@Component({
  selector: 'app-delete-error-modal',
  templateUrl: './delete-error-modal.component.html'
})

export class DeleteErrorModalComponent {
  btnOk = 'ОК';
  constructor(public dialogRef: MatDialogRef<DeleteErrorModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private delUpdateService: UpdateDeleteEntityService) {

  }
}

