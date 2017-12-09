import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Answer} from '../answer';

import {AnswerService} from '../answer.service';
import {InfoModalService} from '../../../info-modal/info-modal.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {generalConst} from '../../../shared/constants/general-constants';
import {UpdateDeleteEntityService} from '../../../shared/services/update-delete-entity-service/update-delete-entity.service';

@Component({
  selector: 'dtest-add-answer-modal',
  templateUrl: './add-answer-modal.component.html',
  styleUrls: ['./add-answer-modal.component.scss'],
})
export class AddAnswerModalComponent {

  placeholders = {
    trueAnswer: 'Статус',
    answerText: 'Відповідь',
    attachment: 'Картинка',
  };
  trueAnswers = [
    {value: 0, text: 'Неправильна'},
    {value: 1, text: 'Правильна'}
  ];
  attachment: string;
  form: FormGroup;
  errorEmptyInput = 'Заповніть поле!';
  errorAnswerText = 'Поле повинно бути заповнене, та займати до 250 символів!';

  constructor(
    private formBuilder: FormBuilder,
    private answerService: AnswerService,
    private modalService: InfoModalService,
    private delUpdateService: UpdateDeleteEntityService,
    public dialogRef: MatDialogRef<AddAnswerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = formBuilder.group({
      'trueAnswer': [null, Validators.required],
      'answerText': [null, [Validators.required, Validators.maxLength(250)]]
    });
  }

  fileSelect(event): void {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.attachment = reader.result;
    };
  }

  onSubmit(answer: Answer) {
    this.dialogRef.close();
    this.answerService.setAnswer({
      questionId: this.data.questionId,
      trueAnswer: answer.trueAnswer,
      answerText: answer.answerText,
      attachment: this.attachment || ''
    }).subscribe(answerData => {
      delete answerData.questionId;
      delete answerData.attachment;
      answerData[0].trueAnswer = this.trueAnswers.find(item => item.value === +answerData[0].trueAnswer).text;
      this.delUpdateService.passInsertedItem(answerData);
      console.log(answerData[0]);
      this.modalService.openSuccessDialog(generalConst.addMsg);
    }, () => {
      this.modalService.openErrorDialog(generalConst.errorMsg);
    });
  }
}
