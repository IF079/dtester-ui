import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UpdateDeleteEntityService} from '../../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {AnswerService} from '../../answer/answer.service';
import {QuestionService} from '../question.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {InfoModalService} from '../../../info-modal/info-modal.service';
import {generalConst} from '../../../shared/constants/general-constants';
import {Question} from '../question';
import {QuestionDto} from '../question-dto';

@Component({
  selector: 'dtest-edit-question-modal',
  templateUrl: './edit-question-modal.component.html',
  styleUrls: ['../add-question-modal/add-question-modal.component.scss']
})

export class EditQuestionModalComponent {
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
  currentQuestion: Question;
  errorEmptyInput = 'Заповніть поле!';
  errorQuestionText = 'Поле повинно бути заповнене, та займати до 250 символів!';

  constructor(private questionService: QuestionService,
              private answerService: AnswerService,
              private formBuilder: FormBuilder,
              private modalService: InfoModalService,
              private delUpdateService: UpdateDeleteEntityService,
              public dialogRef: MatDialogRef<EditQuestionModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentQuestion = data;
    this.createForm();
    const curentType = data[3] ? this.types.find(type => type.text === data[3]).value : null;
    this.form.patchValue({
      questionText: data[1],
      level: +data[2],
      type: curentType,
      attachment: data[4]
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
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

  editQuestion() {
    this.dialogRef.close();
    const entityName = 'Question';
    const test_id = this.data.testId;
    const question_text = this.form.get('questionText').value;
    const level = this.form.get('level').value;
    const type = this.form.get('type').value;
    const attachment = this.attachment;
    this.questionService.getQuestion(this.currentQuestion[0]).subscribe(response => {
      const question_id = +response[0].questionId;
      this.delUpdateService.updateEntity(this.currentQuestion[0], entityName, {
        question_id,
        test_id,
        question_text,
        level,
        type,
        attachment
      }).subscribe((questionData: QuestionDto[]) => {
        delete questionData[0].test_id;
        delete questionData[0].attachment;
        questionData[0].type = this.types.find(item => item.value === +questionData[0].type).text;
        this.delUpdateService.passUpdatedItem(questionData);
        this.modalService.openSuccessDialog(generalConst.updateMsg);
      }, () => {
        this.modalService.openErrorDialog(generalConst.errorMsg);
      });
    });
  }
}
