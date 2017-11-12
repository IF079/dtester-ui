import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import {QuestionService} from '../question.service';
import {InfoModalService} from '../../../info-modal/info-modal.service';
import { QuestionDto } from '../question-dto';

@Component({
  selector: 'app-question-add-modal',
  templateUrl: './question-add-modal.component.html',
  styleUrls: ['./question-add-modal.component.scss']
})
export class QuestionAddModalComponent {

  tests = this.data.tests;
  placeholders = {
    testName: 'Тест',
    questionText: 'Запитання',
    level: 'Рівень',
    type: 'Тип',
    attachment: 'Картинка'
  };
  levels = [
    {value: 1, text: 'Простий'},
    {value: 2, text: 'Середній'},
    {value: 3, text: 'Складний'},
  ];
  types = [
    {value: 1, text: 'Вибрати одну відповідь'},
    {value: 2, text: 'Вибрати декілька відповідей'},
    {value: 3, text: 'Написати свою відповідь'},
  ];
  attachment: string;
  form: FormGroup;
  errorEmptyInput = 'Заповніть поле!';
  errorQuestionText = 'Поле повинно бути заповнене, та займати до 250 символів!';

  constructor(
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private modalService: InfoModalService,
    public dialogRef: MatDialogRef<QuestionAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = formBuilder.group({
      'test': [null, Validators.required],
      'questionText': [null, [Validators.required, Validators.maxLength(250)]],
      'level': [null, Validators.required],
      'type': [null, Validators.required]
    });
  }

  fileSelect(event): void {
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.attachment = reader.result;
    };
  }

  onSubmit(question) {
    this.dialogRef.close();
    this.questionService.setQuestion({
      testId: question.test,
      questionText: question.questionText,
      level: question.level,
      type: question.type,
      attachment: this.attachment || ''
    }).subscribe(data => {
      if (data[0]) {
        this.modalService.openInfoDialog('Запитання успішно добавлено!');
      } else {
        this.modalService.openErrorDialog('Щось пішло не так, як було заплановано! Спробуйте, будь ласка, пізніше.');
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
