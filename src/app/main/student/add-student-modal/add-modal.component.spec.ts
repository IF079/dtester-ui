import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {StudentAddModalComponent} from './add-modal.component';
import {MainMaterialModule} from '../../main-material.module';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UpdateDeleteEntityService} from '../../entity-table/update-delete-entity-service/update-delete-entity.service';

import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AsyncEmailValidator, AsyncUsernameValidator} from './async.validator';
import {MockAsyncEmailValidator, MockAsyncUsernameValidator} from './async.validator.mock';
import {StudentService} from '../student-service/student.service';
import {MockStudentService} from '../../../../../mocks/student/student.service.mock';

class MockMatDialogRef {
  close() {
    return null;
  }
}

xdescribe('Component: StudentAddModalComponent', () => {
  let component: StudentAddModalComponent;
  let fixture: ComponentFixture<StudentAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentAddModalComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MainMaterialModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        UpdateDeleteEntityService,
        { provide: AsyncEmailValidator, useClass: MockAsyncEmailValidator },
        { provide: AsyncUsernameValidator, useClass: MockAsyncUsernameValidator },
        { provide: StudentService, useClass: MockStudentService },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useClass: MockMatDialogRef }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAddModalComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set \'Додати студента\' to h2 selector', () => {
    const string = 'Додати студента';
    const h2 = fixture.debugElement.query(By.css('h2'));
    fixture.detectChanges();
    expect(h2.nativeElement.textContent).toEqual(string);
  });

  it('should create a form with 9 controls', () => {
    expect(component.form.contains('sname')).toBeTruthy();
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('fname')).toBeTruthy();
    expect(component.form.contains('group')).toBeTruthy();
    expect(component.form.contains('gradebookId')).toBeTruthy();
    expect(component.form.contains('username')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.controls['passwords'].get('password')).toBeTruthy();
    expect(component.form.controls['passwords'].get('passwordConfirm')).toBeTruthy();
  });

  it('should make a lot of the controls required', () => {
    const controls = [
      component.form.get('sname'),
      component.form.get('name'),
      component.form.get('fname'),
      component.form.get('gradebookId'),
      component.form.get('username'),
      component.form.get('email'),
      component.form.controls['passwords'].get('password'),
      component.form.controls['passwords'].get('passwordConfirm')
    ];

    controls.forEach(control => {
      control.setValue('');
      expect(control.valid).toBeFalsy();
    });
  });

  it('should set control to invalid if gradebookId is incorrect and to valid if correct', () => {
    const gradebookId = component.form.get('gradebookId');

    gradebookId.setValue('AAD001122');
    expect(gradebookId.valid).toBeFalsy();

    gradebookId.setValue('AA-0011223');
    expect(gradebookId.valid).toBeTruthy();
  });

  it('should set control to invalid if username is allready used and to valid if free',
    inject([StudentService], (studentService: MockStudentService) => {
    const username = component.form.get('username');
    username.setAsyncValidators(MockAsyncUsernameValidator.createValidator(studentService));
    username.setValue('zarazara');
    expect(username.valid).toBeFalsy();

    username.setValue('freeusername');
    expect(username.valid).toBeTruthy();
  }));

  it('should set control to invalid if email is allready used and to valid if free',
    inject([StudentService], (studentService: MockStudentService) => {
    const email = component.form.get('email');
    email.setAsyncValidators(MockAsyncEmailValidator.createValidator(studentService));
    email.setValue('testtest@gmail.com');
    expect(email.valid).toBeFalsy();

    email.setValue('free@mail.com');
    expect(email.valid).toBeTruthy();
  }));

  it('should set controls to invalid if password and passwordConfirm arent the same', () => {
    const passwordGroup = component.form.controls['passwords'];
    const password = passwordGroup.get('password');
    const passwordConfirm = passwordGroup.get('passwordConfirm');

    password.setValue('asdqwe123');
    passwordConfirm.setValue('123qweasd');

    expect(passwordGroup.valid).toBeFalsy();

    password.setValue('asdqwe123');
    passwordConfirm.setValue('asdqwe123');

    expect(passwordGroup.valid).toBeTruthy();
  });
});
