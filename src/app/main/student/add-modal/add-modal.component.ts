import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import {StudentService} from '../student.service';
import {StudentDto} from '../student-dto';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class StudentAddModalComponent implements OnInit {
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
  selectDefaultGroup = this.groups.find(group => +group.value === this.groupId).text;
  form: FormGroup;
  student: any;
  errorEmptyInput = 'Заповніть поле!';
  errorInvalidGradebook = 'Дані повинні бути формату ХХ-ХХХХХХХ (AU-2251346)';
  errorInvalidPassword = 'Пароль повинен займати 8-20 знаків (букви так числа обов\'язкові)!';
  errorInvalidPasswordConfirm = 'Паролі не збігаються!';
  errorInvalidEmail = 'Некоректна адреса!';
  errorInvalidUsername = 'Логін повинен займати 6-16 символів!';

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
    public dialogRef: MatDialogRef<StudentAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = formBuilder.group({
      'sname': [null, Validators.required],
      'name': [null, Validators.required],
      'fname': [null, Validators.required],
      'group': [null],
      'gradebookId': [null, Validators.compose([Validators.required, Validators.pattern(/[A-Z]{2}-\d{7}/)])],
      'username': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'passwords': formBuilder.group({
        'password': [null, Validators.compose([Validators.required, Validators.pattern(/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/)])],
        'passwordConfirm': [null, Validators.required]
      }, {
        validator: this.validatePasswordConfirm
      })
    });
  }

  validatePasswordConfirm(control: AbstractControl) {
    let password = control.get('password').value;
    let passwordConfirm = control.get('passwordConfirm').value;
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
    this.studentService.setStudent({
      studentSurname: student.sname,
      studentName: student.name,
      studentFname: student.fname,
      groupId: student.group || this.selectDefaultGroup,
      gradebookId: student.gradebookId,
      photo: this.dropPhoto || ''
    }, {
      username: student.username,
      email: student.email,
      password: student.passwords.password,
      passwordConfirm: student.passwords.passwordConfirm
    }).subscribe(data => {
      this.dialogRef.close(data);
    });
  }

  ngOnInit() {
  }

}
