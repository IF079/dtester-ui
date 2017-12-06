import {AbstractControl} from '@angular/forms';
import 'rxjs/add/operator/map';

import {MockStudentService} from '../../../../../mocks/student/student.service.mock';

export class MockAsyncUsernameValidator {
  static createValidator(mockStudentService: MockStudentService) {
    return (control: AbstractControl) => {
      return mockStudentService.checkUserName(control.value).map(res => {
        return res.response ? {usernameTaken: true} : null;
      });
    };
  }
}

export class MockAsyncEmailValidator {
  static createValidator(mockStudentService: MockStudentService) {
    return (control: AbstractControl) => {
      return mockStudentService.checkEmailAddress(control.value).map(res => {
        return res.response ? {emailTaken: true} : null;
      });
    };
  }
}
