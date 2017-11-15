import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent {
  type = this.data.type;
  title = this.data.title;
  text = this.data.text;

  constructor(public dialogRef: MatDialogRef<InfoModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
