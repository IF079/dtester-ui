import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import {QuestionService} from '../question.service';
import {InfoModalService} from '../../../info-modal/info-modal.service';
import {Question} from '../question';
import {AnswerService} from '../../answer/answer.service';
import {UpdateDeleteEntityService} from '../../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {generalConst} from '../../../shared/constants/general-constants';

@Component({
  selector: 'dtest-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss']
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
  levels = [1, 2, 3];
  types = [
    {value: 1, text: 'Простий вибір'},
    {value: 2, text: 'Мульти-вибір'},
    {value: 3, text: 'Поле вводу'},
  ];
  attachment: string;
  answers = [];
  form: FormGroup;
  errorEmptyInput = 'Заповніть поле!';
  errorQuestionText = 'Поле повинно бути заповнене, та займати до 250 символів!';

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private formBuilder: FormBuilder,
    private modalService: InfoModalService,
    private delUpdateService: UpdateDeleteEntityService,
    public dialogRef: MatDialogRef<QuestionAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = formBuilder.group({
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
      testId: this.data.testId,
      questionText: question.questionText,
      level: question.level,
      type: question.type,
      attachment: this.attachment || ''
    }).subscribe(questionData => {
      delete questionData[0].test_id;
      delete questionData[0].attachment;
      questionData[0].type = this.types.find(item => item.value === +questionData[0].type).text;
      this.delUpdateService.passInsertedItem(questionData);
      this.modalService.openSuccessDialog(generalConst.addMsg);
      }, () => {
      this.modalService.openErrorDialog(generalConst.errorMsg);
    });
    }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
