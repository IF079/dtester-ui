import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EditEntityModalComponent} from './edit-entity-modal/edit-entity-modal.component';
import {Router} from '@angular/router';
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

  openDialogAndPassDataToIt(rowItem): void {
    const dialogRef = this.dialog.open(EditEntityModalComponent, {
      height: '350px',
      width: '1000px',
      data: rowItem
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
  }

  deleteItem(item) {
    if (confirm('Вы подтверждаете удаление?')) {
      console.log(item);
      this.delUpdateService.deleteEntity(item[0], this.entityName).subscribe(
        (resp) => {
          console.log(resp);
          this.tableRowArr = this.tableRowArr.filter(i => item !== i);
          alert('Сущность была удалена');
        },
        (err) => console.log(err)
      );
    } else {
      alert('Ну как хотите...');
    }
  }

  onSelect(item: any[]) {
    if (this.detailUrl) {
      this.router.navigate([this.detailUrl, item[0]]);
    }
  }
}
