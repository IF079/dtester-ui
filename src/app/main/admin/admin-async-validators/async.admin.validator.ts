import {AbstractControl} from '@angular/forms';

import {AdminService} from '../admin-services/admin.service';

export class AsyncUsernameValidator {
  static createValidator(adminService: AdminService) {
    return (control: AbstractControl) => {
      return adminService.checkUserName(control.value).map(res => {
        return res.response ? {usernameTaken: true} : null;
      });
    };
  }
}

export class AsyncEmailValidator {
  static createValidator(adminService: AdminService) {
    return (control: AbstractControl) => {
      return adminService.checkEmailAddress(control.value).map(res => {
        return res.response ? {emailTaken: true} : null;
      });
    };
  }
}


