import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import {QuestionService} from '../question.service';
import {InfoModalService} from '../../../info-modal/info-modal.service';
import {Question} from '../question';
import {AnswerService} from '../../answer/answer.service';
import {Answer} from '../../answer/answer';

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
  errorAnswersAmount = 'Повинен бути хоча б один варіант правильної відповіді!';

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private formBuilder: FormBuilder,
    private modalService: InfoModalService,
    public dialogRef: MatDialogRef<QuestionAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = formBuilder.group({
      'testId': [null, Validators.required],
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

  onSubmit(question: Question) {
    this.dialogRef.close();
    this.questionService.setQuestion({
      testId: question.testId,
      questionText: question.questionText,
      level: question.level,
      type: question.type,
      attachment: this.attachment || ''
    }).subscribe(questionResp => {
      if (questionResp[0]) {
        this.answers.forEach(item => {
          this.answerService.setAnswer({
            questionId: questionResp[0].question_id,
            trueAnswer: item.isTrue,
            answerText: item.text,
            attachment: ''
          }).subscribe(answerResp => {
            if (!answerResp) {
              this.modalService.openErrorDialog('Щось пішло не так, як було заплановано! Спробуйте, будь ласка, пізніше.');
            }
          });
        });
        this.modalService.openInfoDialog('Запитання успішно добавлено!');
      } else {
        this.modalService.openErrorDialog('Щось пішло не так, як було заплановано! Спробуйте, будь ласка, пізніше.');
      }
    });
  }

  addAnswer(answer: string, isTrue) {
    this.answers.push({
      text: answer,
      isTrue: +isTrue
    });
  }

  validateAnswersLength(control: AbstractControl) {
    return !this.check() ? {invalidAmountOfAnswers: true} : null;
  }

  deleteAnswer(text: string){
    this.answers.splice(this.answers.indexOf(this.answers.find(answer => answer.text === text)), 1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  check(){
    let isAnswersEnough = !!this.answers.length;
    let isTrueAnswer = !!this.answers.find(answer => answer.isTrue === 1);
    return isTrueAnswer && isAnswersEnough;
  }
  checkAnswers(): boolean {
    let isFormValid = this.form.valid;
    return isFormValid && this.check();
  }
}
