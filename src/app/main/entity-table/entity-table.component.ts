import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Student} from '../shared/entities/student';
import {Router} from '@angular/router';
@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})
export class EntityTableComponent implements OnInit, OnChanges {

  tableArray: any[];
  @Input() entityName: string;
  @Input() entityArray: any[];
  @Input() columnsArray: string[];
  @Input() detailUrl: string;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.columnsArray.push('', '');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.entityArray.currentValue) {
      const localArray = [];
      for (const item of changes.entityArray.currentValue) {
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
