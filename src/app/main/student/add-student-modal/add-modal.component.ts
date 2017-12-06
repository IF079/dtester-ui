import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import {StudentService} from '../student-service/student.service';
import {InfoModalService} from '../../info-modal/info-modal.service';
import {AsyncUsernameValidator, AsyncEmailValidator} from './async.validator';
import {Student} from '../student-classes/student';
import {UpdateDeleteEntityService} from '../../entity-table/update-delete-entity-service/update-delete-entity.service';

@Component({
  selector: 'dtest-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
  providers: [StudentService, InfoModalService]
})
export class StudentAddModalComponent {
  passwordVisible = false;
  placeholders = {
    sname: 'Прізвище',
    name: 'Ім\'я',
    fname: 'По-батькові',
    group: 'Група',
    gradebookId: '№ залікової книжки',
    photo: 'Фото',
    username: 'Username',
    email: 'Email',
    password: 'Пароль',
    passwordConfirm: 'Підтвердження паролю'
  };
  btnAdd = 'Додати';
  dropPhoto: string;
  groups = this.data.groups;
  groupId = this.data.groupId;
  form: FormGroup;
  student: any;
  errorEmptyInput = 'Заповніть поле!';
  errorInvalidGradebook = 'Дані повинні бути формату ХХ-ХХХХХХХ (AU-2251346)';
  errorInvalidPassword = 'Пароль повинен займати 8-20 знаків (букви та цифри обов\'язкові)!';
  errorInvalidPasswordConfirm = 'Паролі не збігаються!';
  errorInvalidEmail = 'Некоректна адреса!';
  errorInvalidUsername = 'Логін повинен займати 6-16 символів!';
  errorUsernameIsTaken = 'Такий логін вже використовується!';
  errorEmailIsTaken = 'Така адреса вже використовується!';

  filesSelect(event): void {
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.dropPhoto = reader.result;
    };
  }

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private modalService: InfoModalService,
    public dialogRef: MatDialogRef<StudentAddModalComponent>,
     private delUpdateService: UpdateDeleteEntityService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = formBuilder.group({
      'sname': [null, Validators.required],
      'name': [null, Validators.required],
      'fname': [null, Validators.required],
      'group': [this.groupId + ''],
      'gradebookId': [null, [Validators.required, Validators.maxLength(10), Validators.pattern(/[A-Z]{2}-\d{7}/)]],
      'username': [null, {updateOn: 'blur', validators: [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
        asyncValidators: [AsyncUsernameValidator.createValidator(this.studentService)]}],
      'email': [null, {updateOn: 'blur', validators: [Validators.required, Validators.email],
        asyncValidators: [AsyncEmailValidator.createValidator(this.studentService)]}],
      'passwords': formBuilder.group({
        'password': [null, [Validators.required, Validators.pattern(/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/)]],
        'passwordConfirm': [null, Validators.required]
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(student) {
    const selectedId = student.group || this.groupId;
    this.dialogRef.close();
    this.studentService.setStudent({
      studentSurname: student.sname,
      studentName: student.name,
      studentFname: student.fname,
      groupId: selectedId,
      gradebookId: student.gradebookId,
      photo: this.dropPhoto || ''
    }, {
      username: student.username,
      email: student.email,
      password: student.passwords.password,
      passwordConfirm: student.passwords.passwordConfirm
    }).subscribe(res => {
      if (res.response !== 'ok') {
        this.modalService.openErrorDialog('Помилка при відпраці даних на сервер. Cпробуйте, будь ласка, пізніше.');
      } else if (res.response === 'ok') {
        if (selectedId === this.groupId) {
          this.delUpdateService.passInsertedItem<Student[]>(res);
        }
        this.modalService.openSuccessDialog('Запис успішно добавлено! Обновіть сторінку для відображення даних.');
      }
    });
  }

}
