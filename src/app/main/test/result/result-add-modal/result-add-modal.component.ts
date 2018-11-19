import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {InfoModalService} from '../../../info-modal/info-modal.service';

@Component({
  selector: 'dtest-result-add-modal',
  templateUrl: './result-add-modal.component.html',
  styleUrls: ['./result-add-modal.component.scss']
})
export class ResultAddModalComponent implements OnInit {

  results = this.data.results;

  constructor(
    private modalService: InfoModalService,
    public dialogRef: MatDialogRef<ResultAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
  }

}
