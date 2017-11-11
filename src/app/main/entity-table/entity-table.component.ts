import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from '@angular/router';

import {DeleteConfirmModalComponent} from './delete-confirm-modal/delete-confirm-modal.component';
import {EditEntityModalComponent} from './edit-entity-modal/edit-entity-modal.component';
import {UpdateDeleteEntityService} from './update-delete-entity.service';

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})

export class EntityTableComponent implements OnChanges {
  tableRowArr: any[];
  @Input() entityName: string;
  @Input() entityArray: any[];
  @Input() columnsArray: string[];
  @Input() detailUrl: string;

  constructor(public dialog: MatDialog, private router: Router, private delUpdateService: UpdateDeleteEntityService) {

  }

  updateItemInDom() {
    this.delUpdateService.recordUpdated$.subscribe(res => {
      const id = 0;
      for (let i = 0; i < this.tableRowArr.length; i++) {
        if (this.tableRowArr[i][id] === res[0].subject_id) {
          this.tableRowArr[i] = Object.values(res[0]);
          break;
        }
      }
    });
  }

  deleteItemInDom() {
    this.delUpdateService.recordDeleted$.subscribe(res => {
      console.log(res);
      this.tableRowArr = this.tableRowArr.filter(item => item !== res);
    });
  }
  openDialogAndPassDataToIt(rowItem): void {
    const dialogRef = this.dialog.open(EditEntityModalComponent, {
      height: '350px',
      width: '1000px',
      data: rowItem
    });


  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.entityArray.currentValue) {
      const localArray = [];
      for (const item of this.entityArray) {
        localArray.push(Object.values(item));
      }
      this.tableRowArr = localArray;
    }
    this.updateItemInDom();
    this.deleteItemInDom();
  }

  openDeleteDialogAndPassItemToDelete (item) {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      height: '350px',
      data: {item: item, entityName: this.entityName}
    });


  }

  onSelect(item: any[]) {
    if (this.detailUrl) {
      this.router.navigate([this.detailUrl, item[0]]);
    }
  }
}
