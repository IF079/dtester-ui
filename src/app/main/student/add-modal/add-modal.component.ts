import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import {StudentService} from '../student.service';
import {StudentDto} from '../student-dto';
import {InfoModalComponent} from '../info-modal/info-modal.component';

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
  form: FormGroup;
  student: any;
  errorEmptyInput = 'Заповніть поле!';
  errorInvalidGradebook = 'Дані повинні бути формату ХХ-ХХХХХХХ (AU-2251346)';
  errorInvalidPassword = 'Пароль повинен займати 8-20 знаків (букви так числа обов\'язкові)!';
  errorInvalidPasswordConfirm = 'Паролі не збігаються!';
  errorInvalidEmail = 'Некоректна адреса!';
  errorInvalidUsername = 'Логін повинен займати 6-16 символів!';

  private configImage = {
    acceptExtensions: ['jpg', 'jpeg', 'png', 'gif'],
    maxFilesCount: 1
  };


  constructor(private studentService: StudentService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<StudentAddModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {

  }


}
