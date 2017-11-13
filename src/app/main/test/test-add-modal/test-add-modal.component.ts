import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import {InfoModalService} from '../../info-modal/info-modal.service';
import {TestService} from '../test.service';
import {Test} from '../test';

@Component({
  selector: 'app-test-add-modal',
  templateUrl: './test-add-modal.component.html',
  styleUrls: ['./test-add-modal.component.scss']
})
export class TestAddModalComponent implements OnInit {
  subjects = this.data.subjects;
  tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  attempts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
    public dialogRef: MatDialogRef<TestAddModalComponent>,
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
        this.modalService.openInfoDialog('Тест успішно добавлено!');
      } else {
        this.modalService.openErrorDialog('Щось пішло не так, як було заплановано! Спробуйте, будь ласка, пізніше.');
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
