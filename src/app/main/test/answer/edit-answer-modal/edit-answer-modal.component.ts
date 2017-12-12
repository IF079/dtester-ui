import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnswerService} from '../answer.service';
import {InfoModalService} from '../../../info-modal/info-modal.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {generalConst} from '../../../shared/constants/general-constants';
import {UpdateDeleteEntityService} from '../../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {Answer} from '../answer';

@Component({
  selector: 'dtest-edit-answer-modal',
  templateUrl: './edit-answer-modal.component.html',
  styleUrls: ['../add-answer-modal/add-answer-modal.component.scss']
})
export class EditAnswerModalComponent {

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
  currentAnswer: Answer;
  errorEmptyInput = 'Заповніть поле!';
  errorAnswerText = 'Поле повинно бути заповнене, та займати до 250 символів!';

  constructor(private formBuilder: FormBuilder,
              private answerService: AnswerService,
              private modalService: InfoModalService,
              private delUpdateService: UpdateDeleteEntityService,
              public dialogRef: MatDialogRef<EditAnswerModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentAnswer = data;
    this.createForm();
    this.form.patchValue({
      trueAnswer: data[1]  === 'Правильна' ? 1 : 0,
      answerText: data[2],
      attachment: data[3]
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
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

  editAnswer() {
    this.dialogRef.close();
    const entityName = 'Answer';
    const question_id = this.data.questionId;
    const true_answer = this.form.get('trueAnswer').value;
    const answer_text = this.form.get('answerText').value;
    const attachment = this.attachment;
    if (!(
        true_answer === (this.currentAnswer[1] === 'Правильна' ? 1 : 0) &&
        answer_text === this.currentAnswer[2]
      )) {
      this.answerService.getAnswer(this.currentAnswer[0]).subscribe(response => {
        const answer_id = +response[0].answerId;
        this.delUpdateService.updateEntity(this.currentAnswer[0], entityName, {
          answer_id,
          question_id,
          true_answer,
          answer_text,
          attachment
        }).subscribe(answerData => {
          delete answerData[0].question_id;
          delete answerData[0].attachment;
          answerData[0].true_answer = this.trueAnswers.find(item => item.value === +answerData[0].true_answer).text;
          this.delUpdateService.passUpdatedItem(answerData);
          this.modalService.openSuccessDialog(generalConst.updateMsg);
        }, () => {
          this.modalService.openErrorDialog(generalConst.errorMsg);
        });
      });
    }
  }
}


