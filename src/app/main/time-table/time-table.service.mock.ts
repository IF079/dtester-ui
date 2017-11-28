import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class TimeTableServiceMock {
  getTimeTables() {
    return Observable.forkJoin(
      Observable.of([{timetable_id: 1, start_date: '2017-10-08', start_time: '10:10:00',
                      end_date: '2017-10-08', end_time: '11:30:00'}]),
      Observable.of({numberOfRecords: 1}),
      Observable.of({group_id:1}),
      Observable.of({subject_id:1})
    );
  }
}
