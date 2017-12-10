import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AdminService} from '../admin-services/admin.service';
import {UpdateDeleteEntityService} from '../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {Admin} from '../admin-classes/Admin';
import {AsyncEmailValidator, AsyncUsernameValidator} from '../admin-async-validators/async.admin.validator';
import {SubjectDto} from '../../subject/subject-classes/subject-dto';
import {InfoModalService} from '../../info-modal/info-modal.service';
import {generalConst} from '../../shared/constants/general-constants';


@Component({
  selector: 'dtest-add-admin-modal',
  templateUrl: './add-admin-modal.component.html',
  styleUrls: ['./add-admin-modal.component.scss']
})

export class AddAdminModalComponent {
  passwordVisible = false;

  form: FormGroup;
  placeholders = {
    username: 'Логін',
    email: 'Поштова скринька',
    password: 'Пароль',
    passwordConfirm: 'Підтвердіть пароль'
  };
  btnAdd = 'Додати адміністратора';
  errorRequired = 'Заповніть поле!';
  btnClose = 'Відмінити';
  errorInvalidPassword = 'Пароль повинен займати 8-20 знаків (букви та цифри обов\'язкові)!';
  errorInvalidPasswordConfirm = 'Паролі не збігаються!';
  errorInvalidEmail = 'Некоректна адреса!';
  errorInvalidUsername = 'Логін повинен займати 5-16 символів!';
  errorUsernameIsTaken = 'Такий логін вже використовується!';
  errorEmailIsTaken = 'Така адреса вже використовується!';

  constructor(public dialogRef: MatDialogRef<AddAdminModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private adminService: AdminService,
              private formBuilder: FormBuilder, private delUpdateService: UpdateDeleteEntityService,
              private modalService: InfoModalService) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      username: [null, {
        updateOn: 'blur', validators: [Validators.required, Validators.minLength(5), Validators.maxLength(16)],
        asyncValidators: [AsyncUsernameValidator.createValidator(this.adminService)]
      }],
      email: [null, {
        updateOn: 'blur', validators: [Validators.required, Validators.email],
        asyncValidators: [AsyncEmailValidator.createValidator(this.adminService)]
      }],
      passwords: this.formBuilder.group({
        password: [null, [Validators.required, Validators.pattern(/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/)]],
        passwordConfirm: [null, Validators.required]
      }, {
        validator: this.validatePasswordConfirm
      })
    });
  }

  validatePasswordConfirm(control: AbstractControl) {
    const password = control.get('password').value;
    const passwordConfirm = control.get('passwordConfirm').value;
    if (password !== passwordConfirm) {
      control.get('passwordConfirm').setErrors({invalidPasswordConfirm: true});
    } else {
      return null;
    }
  }

  isFormValid(): boolean {
    return this.form.valid;
  }

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.controls['passwords'].get('password');
  }

  get passwordConfirm() {
    return this.form.controls['passwords'].get('passwordConfirm');
  }

  addAdmin() {
    const username = this.username.value;
    const email = this.email.value;
    const password = this.password.value;
    const password_confirm = this.passwordConfirm.value;
    const arrForAdmin = [];
    this.dialogRef.close();
    this.adminService.addAdmin({email, username, password, password_confirm}).subscribe(adminData => {
        console.log(adminData);
        arrForAdmin.push(adminData);
        this.delUpdateService.passInsertedItem<Admin[]>(arrForAdmin);
        this.modalService.openSuccessDialog(generalConst.addMsg);
      },
      err => {
       this.modalService.openErrorDialog(generalConst.errorMsg);
       }
    );
  }
}
