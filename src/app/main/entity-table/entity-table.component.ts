import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Student} from '../shared/entities/student';
import {Router} from '@angular/router';
import {ModalComponent} from '../modal/modal.component';
import {EntityTableService} from './entity-table.service';


@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss'],
  providers: [ModalComponent]
})
export class EntityTableComponent implements OnInit, OnChanges {

  tableArray: any[];
  @Input() entityName: string;
  @Input() entityArray: any[];
  @Input() columnsArray: string[];
  @Input() detailUrl: string;

  constructor(
    private router: Router,
    private gridService: BasicEntityGridService
  ) {
  }

  ngOnInit() {
    this.columnsArray.push('', '');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.entityArray.currentValue) {
      const newArr = [];
      for (let item of changes.entityArray.currentValue) {
        item = Object.entries(item);
        const minArr = [];
        for (const it of item) {
          minArr.push(it[1]);
        }
        newArr.push(minArr);
      }
      this.tableArray = newArr;
    }
  }

  onSelect(item: any[]) {
    if (this.detailUrl) {
      this.router.navigate([this.detailUrl, item[0]]);
    }
  }

  remove(item: any[], entityName) {
    const itemId = item[0];

    // DANGER!!! FROM DATABASE
    this.gridService.deleteElement(itemId, entityName).subscribe(data => {
      if (data.response === 'ok') {
        this.tableArray.forEach((elem, index) => {
          if (elem[0] === itemId) {
            this.tableArray.splice(index, 1);
          }
        });
      }
    });

    // ONLY FROM TABLE
    this.tableArray.forEach((elem, index) => {
      if (elem[0] === itemId) {
        this.tableArray.splice(index, 1);
      }
    });
  }

}
