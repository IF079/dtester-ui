import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()

export class FacultyServiceMock {
  getFacultiesRange() {
    return Observable.forkJoin(
      Observable.of([{faculty_id: 1, faculty_name: 'Факультет тест', faculty_description: 'Опис факультету тест'}]),
      Observable.of({numberOfRecords: 1})
    );
  }
}
