import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AdminService} from '../admin-services/admin.service';
import {UpdateDeleteEntityService} from '../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {Admin} from '../admin-classes/Admin';


@Component({
  selector: 'dtest-add-admin-modal',
  templateUrl: './add-admin-modal.component.html',
  styleUrls: ['./add-admin-modal.component.scss']
})

export class AddAdminModalComponent {
  addAdminForm: FormGroup;
  successMsg = 'Предмет додано успішно. Оновіть сторінку, щоб побачити зміни.';
  isAdminAdded = false;
  placeholders = {
    login: 'Логін',
    email: 'Поштова скринька',
    password: 'Пароль',
    confirmPassword: 'Підтвердіть пароль'
  };
  btnAdd = 'Додати адміністратора';
  errorRequired = 'Заповніть поле!';
  btnClose = 'Відмінити';
  btnOk = 'Ок';
  errRequestMsg: string;

  constructor(public dialogRef: MatDialogRef<AddAdminModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private adminService: AdminService,
              private formBuilder: FormBuilder, private delUpdateService: UpdateDeleteEntityService) {
    this.createForm();
  }

  createForm(): void {
    this.addAdminForm = this.formBuilder.group({
      login: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
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
    return this.addAdminForm.get('password');
  }

  get confirmPassword() {
    return this.addAdminForm.get('confirmPassword');
  }

  addAdmin() {
    const username = this.login.value;
    const email = this.email.value;
    const password = this.password.value;
    const confirmPassword = this.confirmPassword.value;

    this.adminService.addAdmin({email, username: login,  password, confirmPassword}).subscribe(admin => {
        this.isAdminAdded = true;
      },
      err => {
        this.errRequestMsg = 'Даний адміністратор вже існує. Або відбулась інша помилка';
      }
    );
  }
}
