import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';

import {Credentials} from '../services/entities/credentials';
import {LoginService} from '../services/login.service';
import {LoggerFactory} from '../../shared/logger/logger.factory';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  USERNAME_MIN_LENGTH = 3;
  USERNAME_MAX_LENGTH = 16;
  username: FormControl = new FormControl('username', [
    Validators.required,
    Validators.minLength(this.USERNAME_MIN_LENGTH),
    Validators.maxLength(this.USERNAME_MAX_LENGTH)
  ]);
  PASSWORD_MIN_LENGTH = 3;
  PASSWORD_MAX_LENGTH = 16;
  password: FormControl = new FormControl('password', [
    Validators.required,
    Validators.minLength(this.PASSWORD_MIN_LENGTH),
    Validators.maxLength(this.PASSWORD_MAX_LENGTH)
  ]);
  credentials: Credentials = {
    username: 'admin',
    password: 'dtapi_admin'
  };
  isBadCredentialsError = false;
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
                this.setupBadCredentialsError(err);
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

  private setupBadCredentialsError(err: HttpErrorResponse): void {
    this.isBadCredentialsError = true;
  }

  private isFormValid(): boolean {
    return this.username.valid && this.password.valid;
  }

}
const log = LoggerFactory.create(LoginComponent);
