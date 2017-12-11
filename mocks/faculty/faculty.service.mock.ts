import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()

export class FacultyServiceMock {
  getFaculties() {
    return Observable.forkJoin(
      Observable.of([
        {faculty_id: 1, faculty_name: 'Faculty 1', faculty_description: 'Faculty 1 description'},
        {faculty_id: 2, faculty_name: 'Faculty 2', faculty_description: 'Faculty 2 description'},
        {faculty_id: 3, faculty_name: 'Faculty 3', faculty_description: 'Faculty 3 description'}
      ]),
      Observable.of({numberOfRecords: 1})
    );
  }
}
