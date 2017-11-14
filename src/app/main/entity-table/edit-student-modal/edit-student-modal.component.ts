import {Component, Inject, group} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {UpdateDeleteEntityService} from '../update-delete-entity.service';
import {StudentService} from '../../student/student.service';
import {Student} from '../../student/student';
import {AsyncUsernameValidator} from '../../student/add-modal/async-username.validator';

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['../../student/add-modal/add-modal.component.scss']
})

export class EditStudentModalComponent {
  form: FormGroup;
  curentStudent: Student;
  groups: any[];
  groupId: number;
  dropPhoto: string;
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
  btnEdit = 'Зберегти';
  errorEmptyInput = 'Заповніть поле!';
  errorInvalidGradebook = 'Дані повинні бути формату ХХ-ХХХХХХХ (AU-2251346)';
  errorInvalidPassword = 'Пароль повинен займати 8-20 знаків (букви та цифри обов\'язкові)!';
  errorInvalidPasswordConfirm = 'Паролі не збігаються!';
  errorInvalidEmail = 'Некоректна адреса!';
  errorInvalidUsername = 'Логін повинен займати 6-16 символів!';
  errorUsernameIsTaken = 'Такий логін вже використовується!';

  constructor(
    public dialogRef: MatDialogRef<EditStudentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private delUpdateService: UpdateDeleteEntityService,
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.createForm();
    this.parseGroups((groupsArr) => {
      this.studentService.getStudent(this.data[0]).subscribe(response => {
        const gradebookId = this.data[1];
        const studentSurname = this.data[2];
        const studentName = this.data[3];
        const studentFname = this.data[4];
        const studentGroup = response[0].groupId;
        this.dropPhoto = response[0].photo;
        this.form.patchValue({
          sname: studentSurname,
          name: studentName,
          fname: studentFname,
          group: studentGroup,
          gradebookId: gradebookId
        });
      })
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      'sname': [null, Validators.required],
      'name': [null, Validators.required],
      'fname': [null, Validators.required],
      'group': [null],
      'gradebookId': [null, [Validators.required, Validators.maxLength(10), Validators.pattern(/[A-Z]{2}-\d{7}/)]],
      'username': [{value: '', disabled: true}, [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
        AsyncUsernameValidator.createValidator(this.studentService)],
      'email': [{value: null, disabled: true}, [Validators.required, Validators.email]],
      'passwords': this.formBuilder.group({
        'password': [{value: '', disabled: true}, [Validators.required, Validators.pattern(/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/)]],
        'passwordConfirm': [{value: '', disabled: true}, Validators.required]
      }, {
          validator: this.validatePasswordConfirm
        })
    });
  }

  filesSelect(event): void {
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.dropPhoto = reader.result;
    };
  }

  parseGroups(callback): void {
    this.studentService.getGroups().subscribe(response => {
      let localArr = [];
      response.forEach(oneGroup => {
        localArr.push({
          value: oneGroup.group_id,
          text: oneGroup.group_name
        });
      });
      this.groups = localArr;
      callback(localArr);
    });
  }

  validatePasswordConfirm(control: AbstractControl) {
    let password = control.get('password').value;
    let passwordConfirm = control.get('passwordConfirm').value;
    if (password !== passwordConfirm) {
      control.get('passwordConfirm').setErrors({ invalidPasswordConfirm: true });
    } else {
      return null;
    }
  }

  editStudent() {
    const id = this.data[0];
    const entityName = 'Student';
    const student_name = this.form.get('name').value;
    const student_fname = this.form.get('fname').value;
    const student_surname = this.form.get('sname').value;
    const gradebook_id = this.form.get('gradebookId').value;
    const group_id = this.form.get('group').value;
    const photo = this.dropPhoto || '';
    this.delUpdateService.updateEntity(id, entityName, {
      student_name,
      student_fname,
      student_surname,
      gradebook_id,
      group_id,
      photo
    }).subscribe(response => {
      this.studentService.getStudent(this.data[0]).subscribe(responseStudent =>{
        console.log(responseStudent);
        this.delUpdateService.passUpdatedStudent(responseStudent);
        this.dialogRef.close();
      });
    },
      err => console.log(err)
    );
  }

}