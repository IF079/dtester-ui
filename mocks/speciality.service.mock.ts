import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class SpecialityServiceMock {
  getSpeciality() {
    return Observable.forkJoin(
      Observable.of([{speciality_id: 1, speciality_code: '7.7775555', speciality_name: 'test'}]),
      Observable.of({numberOfRecords: 1})
      );
  }
}
