import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
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
  constructor(private router: Router, private delUpdateService: UpdateDeleteEntityService) {
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
