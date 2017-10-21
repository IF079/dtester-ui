import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Student} from '../shared/entities/student';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basic-entity-grid',
  templateUrl: './basic-entity-grid.component.html',
  styleUrls: ['./basic-entity-grid.component.scss']
})
export class BasicEntityGridComponent implements OnInit, OnChanges {

  tableArray: any[];
  @Input() entityArray: any[];
  @Input() columnsArray: string[];
  @Input() detailUrl: string;

  constructor(private router: Router) { }

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
      // console.log(newArr);
      this.tableArray = newArr;
    }
  }

  onSelect(item: any[]) {
    this.router.navigate([this.detailUrl, item[0]]);
  }

}
