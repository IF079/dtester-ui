import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class MockSubjectService {
  getSubjectsRange() {
    return Observable.forkJoin(
      Observable.of([
        {id: 1, name: 'Subject 1', description: 'Subject 1 description'},
        {id: 2, name: 'Subject 2', description: 'Subject 2 description'},
        {id: 3, name: 'Subject 3', description: 'Subject 3 description'}
     ]),
      Observable.of({numberOfRecords: '3'})
    );
  }
}
