import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LoginService} from './services/login.service';
import {LOGIN_FORM_DEFAULT_CONFIG} from './config/login-form.default.config';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'dtest-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  hasBadCredentialsError = false;
  returnUrl: string;

  constructor(private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  this.loginForm = this.fb.group({
    username: [null, Validators.compose([
      Validators.required,
      Validators.minLength(LOGIN_FORM_DEFAULT_CONFIG.USERNAME.MIN_LENGTH),
      Validators.maxLength(LOGIN_FORM_DEFAULT_CONFIG.USERNAME.MAX_LENGTH)])],
    password: [null, Validators.compose([
      Validators.required,
      Validators.minLength(LOGIN_FORM_DEFAULT_CONFIG.PASSWORD.MIN_LENGTH),
      Validators.maxLength(LOGIN_FORM_DEFAULT_CONFIG.PASSWORD.MAX_LENGTH)
    ])]
  });
  }

  login() {
    if (this.isFormValid()) {
      this.loginService.username(this.loginForm.value)
        .subscribe(
          () => {
              this.router.navigate([this.getReturnUrl()]);
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

  getReturnUrl() {
    return this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  getRequiredMsg(): string {
    return 'Поле повинно бути заповненим';
  }

  getInsufficientLengthErrorMsg(minLengthError: any): string {
    return `Кількість символів повинна бути більша ніж ${minLengthError.requiredLength} , зараз ${minLengthError.actualLength}`;
  }

  getExceedingLengthErrorMsg(maxLengthError: any): string {
    return `Кількість символів повинна бути менша ніж ${maxLengthError.requiredLength} , зараз ${maxLengthError.actualLength}`;
  }

  private isFormValid(): boolean {
    return this.loginForm.valid;
  }
}
