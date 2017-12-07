import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AdminService} from '../admin-services/admin.service';
import {UpdateDeleteEntityService} from '../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {Admin} from '../admin-classes/Admin';
import {AsyncEmailValidator, AsyncUsernameValidator} from '../admin-async-validators/async.admin.validator';


@Component({
  selector: 'dtest-add-admin-modal',
  templateUrl: './add-admin-modal.component.html',
  styleUrls: ['./add-admin-modal.component.scss']
})

export class AddAdminModalComponent {
  passwordVisible = false;

  addAdminForm: FormGroup;
  successMsg = 'Адміністратора додано успішно. Оновіть сторінку, щоб побачити зміни.';
  isAdminAdded = false;
  placeholders = {
    username: 'Логін',
    email: 'Поштова скринька',
    password: 'Пароль',
    passwordConfirm: 'Підтвердіть пароль'
  };
  btnAdd = 'Додати адміністратора';
  errorRequired = 'Заповніть поле!';
  btnClose = 'Відмінити';
  btnOk = 'Ок';
  errorRequestMsg: string;
  errorInvalidPassword = 'Пароль повинен займати 8-20 знаків (букви та цифри обов\'язкові)!';
  errorInvalidPasswordConfirm = 'Паролі не збігаються!';
  errorInvalidEmail = 'Некоректна адреса!';
  errorInvalidUsername = 'Логін повинен займати 6-16 символів!';
  errorUsernameIsTaken = 'Такий логін вже використовується!';

  constructor(public dialogRef: MatDialogRef<AddAdminModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private adminService: AdminService,
              private formBuilder: FormBuilder, private delUpdateService: UpdateDeleteEntityService) {
    this.createForm();
  }

  createForm(): void {
    this.addAdminForm = this.formBuilder.group({
      username: [null, {updateOn: 'blur', validators: [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
        asyncValidators: [AsyncUsernameValidator.createValidator(this.adminService)]}],
      email: [null, {updateOn: 'blur', validators: [Validators.required, Validators.email],
        asyncValidators: [AsyncEmailValidator.createValidator(this.adminService)]}],
      passwords: this.formBuilder.group({
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required, [Validators.required, Validators.pattern(/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/)]]
      }, {
        validator: this.validatePasswordConfirm
      })
    });
  }

  validatePasswordConfirm (control: AbstractControl) {
    const password = control.get('password').value;
    const passwordConfirm = control.get('passwordConfirm').value;
    if (password !== passwordConfirm) {
      control.get('passwordConfirm').setErrors({invalidPasswordConfirm: true});
    } else {
      return null;
    }
  }

  isFormValid(): boolean {
    return this.addAdminForm.valid;
  }

  get username() {
    return this.addAdminForm.get('username');
  }

  get email() {
    return this.addAdminForm.get('email');
  }

  get password() {
    return this.addAdminForm.controls['passwords'].get('password');
  }

  get passwordConfirm() {
    return this.addAdminForm.controls['passwords'].get('passwordConfirm');
  }

  addAdmin() {
    const username = this.username.value;
    const email = this.email.value;
    const password = this.password.value;
    const password_confirm = this.passwordConfirm.value;

    this.adminService.addAdmin({email, username, password, password_confirm}).subscribe(admin => {
        this.isAdminAdded = true;
      },
      err => {
        console.log(err);
        this.errorRequestMsg = 'Відбулась помилка на сервері';
      }
    );
  }
}
