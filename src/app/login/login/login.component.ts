import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';

import {Credentials} from '../services/entities/credentials';
import {LoginService} from '../services/login.service';
import {LOGIN_FORM_DEFAULT_CONFIG} from './config/login-form.default.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  username: FormControl = new FormControl('username', [
    Validators.required,
    Validators.minLength(LOGIN_FORM_DEFAULT_CONFIG.USERNAME.MIN_LENGTH),
    Validators.maxLength(LOGIN_FORM_DEFAULT_CONFIG.USERNAME.MAX_LENGTH)
  ]);
  password: FormControl = new FormControl('password', [
    Validators.required,
    Validators.minLength(LOGIN_FORM_DEFAULT_CONFIG.PASSWORD.MIN_LENGTH),
    Validators.maxLength(LOGIN_FORM_DEFAULT_CONFIG.PASSWORD.MAX_LENGTH)
  ]);
  credentials: Credentials = {
    username: '',
    password: ''
  };
  hasBadCredentialsError = false;

  constructor(private loginService: LoginService) {
  }

  login() {
    if (this.isFormValid()) {
      this.loginService.login(this.credentials)
        .subscribe(
          () => {
          },
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 400) {
                this.hasBadCredentialsError = true;
              }
            }
          }
        );
    }
  }

  getRequiredMsg(): string {
    return 'Required';
  }

  getInsufficientLengthErrorMsg(minLengthError: any): string {
    return `Should be longer than ${minLengthError.requiredLength} symbols, currently ${minLengthError.actualLength}`;
  }

  getExceedingLengthErrorMsg(maxLengthError: any): string {
    return `Should be shorter than ${maxLengthError.requiredLength} symbols, currently ${maxLengthError.actualLength}`;
  }

  private isFormValid(): boolean {
    return this.username.valid && this.password.valid;
  }
}
