import {MatPaginatorIntl} from '@angular/material';

export class MatPaginatorIntlUkr extends MatPaginatorIntl {
  itemsPerPageLabel = 'Кількість записів на сторінці';
  nextPageLabel     = 'Наступна сторінка';
  previousPageLabel = 'Попередня сторінка';

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 з ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' з ' + length;
  };
}
