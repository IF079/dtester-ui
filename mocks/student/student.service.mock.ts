import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

import {mockedResponse, mockedNumberOfRecords} from './student.mock.constants';

@Injectable()

export class MockStudentService {
  getStudentsByGroup() {
    return Observable.of(mockedResponse);
  }
  getStudentsRange() {
    return Observable.of([mockedResponse, mockedNumberOfRecords]);
  }
  checkUserName(username) {
    if (username === 'zarazara') {
      return Observable.of({response: true});
    } else {
      return Observable.of({response: false});
    }
  }
  checkEmailAddress(email) {
    if (email === 'testtest@gmail.com') {
      return Observable.of({response: true});
    } else {
      return Observable.of({response: false});
    }
  }
}
