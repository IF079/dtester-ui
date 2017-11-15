import {AbstractControl} from '@angular/forms';
import {StudentService} from '../student.service';

export class AsyncUsernameValidator {
  static createValidator(studentService: StudentService) {
    return (control: AbstractControl) => {
      return studentService.checkUserName(control.value).map(res => {
        return res.response ? {usernameTaken: true} : null;
      });
    };
  }
}

export class AsyncEmailValidator {
  static createValidator(studentService: StudentService) {
    return (control: AbstractControl) => {
      return studentService.checkEmailAddress(control.value).map(res => {
        return res.response ? {emailTaken: true} : null;
      });
    };
  }
}
