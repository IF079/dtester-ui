import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

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

  constructor(private router: Router, private delUpdateService: UpdateDeleteEntityService, public dialog: MatDialog) {
  }

  openDialogAndPassDataToIt(item: any) {
    const dialogRef = this.dialog.open(EditEntityModalComponent, {
      height: '350px',
      width: '1000px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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

  deleteItem(item: any) {
    const id = item[0];
    this.delUpdateService.deleteEntity(id, this.entityName).subscribe(
      (resp) => {
        console.log(resp);
        this.tableRowArr = this.tableRowArr.filter(i => item !== i);
      },
      (err) => console.log(err)
    );
  }

  onSelect(item: any[]) {
    if (this.detailUrl) {
      this.router.navigate([this.detailUrl, item[0]]);
    }
  }
}
