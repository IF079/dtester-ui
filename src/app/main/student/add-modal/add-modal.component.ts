import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class StudentAddModalComponent implements OnInit {
  placeholders = {
    sname: 'Прізвище',
    name: 'Ім\'я',
    fname: 'По-батькові',
    groupId: '№ групи',
    gradebookId: '№ залікової книжки',
    photo: 'Фото',
    username: 'Username',
    email: 'Email',
    password: 'Пароль',
    confirmPassword: 'Підтвердження паролю'
  };
  dropPhoto: string;



  constructor() {
  }

  ngOnInit() {
  }

}
