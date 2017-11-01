import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})

export class EntityTableComponent implements OnChanges {
  tableArray: any[];
  @Input() entityArray: any[];
  @Input() columnsArray: string[];
  @Input() detailUrl: string;
  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.entityArray.currentValue) {
      const localArray = [];
      for (const item of this.entityArray) {
        localArray.push(Object.values(item));
      }
      this.tableArray = localArray;
    }
  }

  onSelect(item: any[]) {
    if (this.detailUrl) {
      this.router.navigate([this.detailUrl, item[0]]);
    }
  }
}
