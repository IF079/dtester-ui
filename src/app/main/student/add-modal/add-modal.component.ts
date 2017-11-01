import {Component, OnInit} from '@angular/core';
import {Ng4FilesService, Ng4FilesConfig, Ng4FilesStatus, Ng4FilesSelected} from 'angular4-files-upload';

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

  private configImage: Ng4FilesConfig = {
    acceptExtensions: ['jpg', 'jpeg', 'png', 'gif'],
    maxFilesCount: 1
  };

  filesSelect(selectedFiles: Ng4FilesSelected): void {
    if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
      console.log(selectedFiles.status);
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(selectedFiles.files[0]);
    reader.onload = () => {
      this.dropPhoto = reader.result;
    };
  }

  constructor(private ng4FilesService: Ng4FilesService) {
  }

  ngOnInit() {
    this.ng4FilesService.addConfig(this.configImage, 'image-config');
  }

}
