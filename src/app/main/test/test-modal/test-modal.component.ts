import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {InfoModalService} from '../../info-modal/info-modal.service';
import {TestService} from '../test.service';
import {Test} from '../test';

@Component({
  selector: 'dtest-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent {
  type = this.data.type;
  subjects = this.data.subjects;
  viewTestArray: Test[];
  tasks = this.setArrayOfDigit(30);
  attempts = this.setArrayOfDigit(10);
  viewHeadersArray = ['Тема', 'Завдань', 'Час', 'Спроби', 'Статус'];
  status = [{value: 1, text: 'Доступний'}, {value: 0, text: 'Недоступний'}];
  placeholders = {
    testName: 'Назва',
    subjectName: 'Предмет',
    tasks: 'Кількість завдань',
    timeForTest: 'Час для виконання тесту',
    enabled: 'Статус',
    attempts: 'Кількість спроб'
  };
  form: FormGroup;
  errorEmptyInput = 'Заповніть поле!';
  errorTestName = 'Поле повинно бути заповнене, та займати до 60 символів!';

  constructor(
    private testService: TestService,
    private formBuilder: FormBuilder,
    private modalService: InfoModalService,
    public dialogRef: MatDialogRef<TestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = formBuilder.group({
      'testName': [null, [Validators.required, Validators.maxLength(60)]],
      'subjectId': [null, Validators.required],
      'tasks': [null, Validators.required],
      'timeForTest': [null, Validators.required],
      'enabled': [null, Validators.required],
      'attempts': [null, Validators.required]
    });
  }

  setArrayOfDigit(amount: number) {
    const localArr = [];
    for (let i = 1; i <= amount; i++) {
      localArr.push(i);
    }
    return localArr;
  }

  onSubmit(test: Test): void {
    this.dialogRef.close();
    this.testService.addTest({
      testName: test.testName,
      subjectId: test.subjectId,
      tasks: test.tasks,
      timeForTest: test.timeForTest,
      enabled: test.enabled,
      attempts: test.attempts
    }).subscribe(data => {
      if (data[0]) {
        this.modalService.openSuccessDialog('Тест успішно добавлено!');
      } else {
        this.modalService.openErrorDialog('Щось пішло не так, як було заплановано! Спробуйте, будь ласка, пізніше.');
      }
    });
  }

  onViewChange(event) {
    const id = event.value;
    this.dialogRef.updateSize('550px');
    this.testService.getTestsBySubjectId(id).subscribe(response => {
      this.viewTestArray = response;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
