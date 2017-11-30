import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class SpecialityServiceMock {
  getSubjectsRange() {
    return Observable.forkJoin(
      Observable.of([{subject_id: 1, subject_name: 'Вивчення зір fasa sf', subject_description: 'test'}]),
      Observable.of({numberOfRecords: 1})
    );
  }
}
