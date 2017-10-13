import {Component, OnInit} from '@angular/core';
import {Credentials} from '../services/entities/credentials';
import {LoginService} from '../services/login.service';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {ErrorStateMatcher} from '@angular/material';
import {ErrorStateMatcherFactory} from '../utils/error-state-matcher.factory';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: Credentials = {
    username: 'admin1',
    password: 'dtapi_admin'
  };

  errorMessageFor = {
    username: '',
    password: ''
  };

  private lastCredentials: Credentials = {
    username: '',
    password: ''
  };

  usernameErrorStateMatcher: ErrorStateMatcher = ErrorStateMatcherFactory.create(false);
  passwordErrorStateMatcher: ErrorStateMatcher = ErrorStateMatcherFactory.create(false);

  username: FormControl = new FormControl('username', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]);
  password: FormControl = new FormControl('password', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]);

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  login() {
    if (!this.hasErrors()) {
      this.setupLastCredentials();
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

  setupLastCredentials(): void {
    this.lastCredentials.username = this.credentials.username.toString();
    this.lastCredentials.password = this.credentials.password.toString();
  }

  setupBadCredentialsError(err: HttpErrorResponse): void {
    this.errorMessageFor.username = JSON.parse(err.error).response;
    this.usernameErrorStateMatcher = ErrorStateMatcherFactory.createWithFunction(() => {
      return this.credentials.username === this.lastCredentials.username;
    });
    this.passwordErrorStateMatcher = ErrorStateMatcherFactory.createWithFunction(() => {
      return this.credentials.password === this.lastCredentials.password;
    });
  }

  hasErrors(): boolean {
    return this.usernameErrorStateMatcher.isErrorState(null, null) &&
      this.passwordErrorStateMatcher.isErrorState(null, null);
  }

}

const log = LoggerFactory.create(LoginComponent);
