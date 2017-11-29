import {Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()

export class MockStudentService {
  getStudentsByGroup() {
    return Observable.of([{
      userId: 20,
      gradebookId: 'UX-3311221',
      studentSurname: 'Лящовський',
      studentName: 'Андрій',
      studentFname: 'Іванович',
      groupId: '2',
      plainPassword: 'zzzzzzzzzzzz',
      photo: 'theremustbeaphoto1'
    }, {
      userId: 13,
      gradebookId: 'UY-3019273',
      studentSurname: 'Заник',
      studentName: 'Іван',
      studentFname: 'Григорович',
      groupId: '2',
      plainPassword: 'xxxxxxxxxxx',
      photo: 'theremustbeaphoto2'
    }, {
      userId: 155,
      gradebookId: 'UT-1029384',
      studentSurname: 'Лінкольн',
      studentName: 'Абрагім',
      studentFname: 'Зимонсович',
      groupId: '2',
      plainPassword: 'yyyyyyyyyy',
      photo: 'theremustbeaphoto3'
    }]);
  }
  getStudentsRange() {
    return Observable.of([[
      {
        userId: 20,
        gradebookId: 'UX-3311221',
        studentSurname: 'Лящовський',
        studentName: 'Андрій',
        studentFname: 'Іванович',
        groupId: '2',
        plainPassword: '',
        photo: ''
      }, {
        userId: 13,
        gradebookId: 'UY-3019273',
        studentSurname: 'Заник',
        studentName: 'Іван',
        studentFname: 'Григорович',
        groupId: '5',
        plainPassword: '',
        photo: ''
      }, {
        userId: 155,
        gradebookId: 'UT-1029384',
        studentSurname: 'Лінкольн',
        studentName: 'Абрагім',
        studentFname: 'Зимонсович',
        groupId: '1',
        plainPassword: '',
        photo: ''
      }], {
      numberOfRecords: '3'
    }]);
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
