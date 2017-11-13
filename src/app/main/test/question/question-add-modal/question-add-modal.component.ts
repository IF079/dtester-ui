import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import {QuestionService} from '../question.service';
import {InfoModalService} from '../../../info-modal/info-modal.service';
import {Question} from '../question';

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
    attachment: 'Картинка',
    answer: 'Відповідь'
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
  answers = [];
  form: FormGroup;
  errorEmptyInput = 'Заповніть поле!';
  errorQuestionText = 'Поле повинно бути заповнене, та займати до 250 символів!';
  errorAnswersAmount = 'Повинно бути не менше двох варіантів відповідей!';

  constructor(
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private modalService: InfoModalService,
    public dialogRef: MatDialogRef<QuestionAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = formBuilder.group({
      'testId': [null, Validators.required],
      'questionText': [null, [Validators.required, Validators.maxLength(250)]],
      'level': [null, Validators.required],
      'type': [null, Validators.required],
      'answers': [null, this.validateAnswersLength]
    });
  }

  fileSelect(event): void {
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.attachment = reader.result;
    };
  }

  onSubmit(question: Question) {
    this.dialogRef.close();
    this.questionService.setQuestion({
      testId: question.testId,
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

  addAnswer(answer: string, isTrue) {
    console.log(answer);
    console.log(isTrue);
    this.answers.push({
      text: answer,
      isTrue: isTrue
    });
  }

  validateAnswersLength(control: AbstractControl) {
    // console.log(this);
    /*if (this.answers.length || this.answers.length < 2) {
      control.get('answers').setErrors({invalidAmountOfAnswers: true});
    } else {
      return null;
    }*/
  }

  deleteAnswer(text: string){
    this.answers.splice(this.answers.indexOf(this.answers.find(answer => answer.text === text)), 1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
