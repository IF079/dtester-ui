import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import {TestDetailService} from '../test-detail.service';
import {InfoModalService} from '../../../info-modal/info-modal.service';
import {TestDetail} from '../test-detail';

@Component({
  selector: 'dtest-test-detail-add-modal',
  templateUrl: './test-detail-add-modal.component.html',
  styleUrls: ['./test-detail-add-modal.component.scss']
})
export class TestDetailAddModalComponent {
  levels = this.setArrayOfDigit(10);
  placeholders = {
    level: 'Рівень',
    tasks: 'Кількість запитань',
    rate: 'Кількість балів'
  };
  maxTasks = this.data.maxTasks;
  nowTasks = this.data.nowTasks;
  existLevels = this.data.levels;
  form: FormGroup;
  errorLevelExist = 'Рівен вже існує!';
  errorEmptyInput = 'Заповніть поле!';
  errorTasksAmount = 'Перевищена кількість запитань!';
  errorOnlyDigits = 'Букви та символи недопустимі!';

  constructor(
    private testDetailService: TestDetailService,
    private formBuilder: FormBuilder,
    private modalService: InfoModalService,
    public dialogRef: MatDialogRef<TestDetailAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = formBuilder.group({
      'level': [null, [Validators.required, TestDetailValidator.createLevelValidator(this.existLevels)]],
      'tasks': [null, [TestDetailValidator.createTasksValidator(this.nowTasks, this.maxTasks), Validators.pattern(/^\d{1,3}$/)]],
      'rate': [null, [Validators.required, Validators.pattern(/^\d{1,3}$/)]]
    });
  }

  onSubmit(testDetail: TestDetail) {
    this.dialogRef.close();
    this.testDetailService.addTestDetail({
      testId: this.data.testId,
      level: testDetail.level,
      tasks: testDetail.tasks,
      rate: testDetail.rate
    }).subscribe(testDetailResp => {
      if (testDetailResp[0]) {
        this.modalService.openSuccessDialog('Деталі тесту успішно добавлено!');
      } else {
        this.modalService.openErrorDialog('Щось пішло не так, як було заплановано! Спробуйте, будь ласка, пізніше.');
      }
    });
  }

  parseInt(s: string): number {
    return parseInt(s, 10);
  }

  setArrayOfDigit(amount: number) {
    const localArr = [];
    for (let i = 1; i <= amount; i++) {
      localArr.push(i);
    }
    return localArr;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

class TestDetailValidator {
  static createTasksValidator(now: number, max: number) {
    return (control: AbstractControl) => {
      const tasksAmount = control ? +control.value : 0;
      return tasksAmount + now > max ? {invalidTasksAmount: true} : null;
    };
  }

  static createLevelValidator(levels: string[]) {
    return (control: AbstractControl) => {
      const controlLevel = '' + control.value;
      return levels.indexOf(controlLevel) > -1 ? {levelAlreadyExist: true} : null;
    };
  }
}
