import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import {TestDetailService} from '../test-detail.service';
import {InfoModalService} from '../../../info-modal/info-modal.service';
import {TestDetail} from '../test-detail';
import {TestService} from '../../test.service';
import {TestDetailValidator} from '../test-detail-validator';
import { UpdateDeleteEntityService } from '../../../shared/services/update-delete-entity-service/update-delete-entity.service';
import { generalConst } from '../../../shared/constants/general-constants';

@Component({
  selector: 'dtest-edit-test-detail-modal',
  templateUrl: './edit-test-detail-modal.component.html',
  styleUrls: ['../add-test-detail-modal/add-test-detail-modal.component.scss']
})
export class EditTestDetailModalComponent {
  levels = this.setArrayOfDigit(10);
  placeholders = {
    level: 'Рівень',
    tasks: 'Кількість запитань',
    rate: 'Кількість балів'
  };
  testId: number;
  maxTasks = 0;
  nowTasks = 0;
  existLevels = [];
  form: FormGroup;
  errorLevelExist = 'Рівень вже існує!';
  errorEmptyInput = 'Заповніть поле!';
  errorTasksAmount = 'Перевищена кількість запитань!';
  errorOnlyDigits = 'Букви та символи недопустимі!';

  constructor(
    private testDetailService: TestDetailService,
    private testService: TestService,
    private formBuilder: FormBuilder,
    private modalService: InfoModalService,
    public dialogRef: MatDialogRef<EditTestDetailModalComponent>,
    private delUpdateService: UpdateDeleteEntityService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getMaxAndCurentTypesValue();
    this.form = formBuilder.group({
      'level': [null, Validators.required],
      'tasks': [null],
      'rate': [null, [Validators.required, Validators.pattern(/^\d{1,3}$/)]]
    });
    this.form.patchValue({
      level: +data[1],
      tasks: data[2],
      rate: data[3]
    });
  }

  editTestDetail() {
    const entityName = 'TestDetail';
    const id = +this.data[0];
    const test_id = this.testId;
    const level = +this.form.get('level').value;
    const tasks = +this.form.get('tasks').value;
    const rate = +this.form.get('rate').value;
    this.dialogRef.close();
    if (!(
      level === +this.data[1] &&
      tasks === +this.data[2] &&
      rate === +this.data[3]
    )) {
      this.delUpdateService.updateEntity(id, entityName, {
        test_id,
        level,
        tasks,
        rate
      }).subscribe(testDetailResp => {
        if (testDetailResp[0]) {
          this.modalService.openSuccessDialog(generalConst.updateMsg);
        } else {
          this.modalService.openErrorDialog(generalConst.errorMsg);
        }
      });
    }
  }

  getMaxAndCurentTypesValue(): void {
    this.testDetailService.getTestDetail(this.data[0]).subscribe(testDetail => {
      this.testId = testDetail[0].testId;
      this.testDetailService.getTestDetailsByTestId(testDetail[0].testId).subscribe(testDetails => {
        const levels = [];
        let now = 0;
        testDetails.forEach(td => {
          if (td.id !== this.data[0]) { now += +td.tasks; }
          levels.push('' + td.level);
        });
        this.nowTasks = now;
        this.existLevels = levels;
        this.testService.getTest(testDetail[0].testId).subscribe(test => {
          this.maxTasks = test[0].tasks;
          this.form.get('level').setValidators(TestDetailValidator.createEditLevelValidator(this.data[1], this.existLevels));
          this.form.get('tasks').setValidators([TestDetailValidator.createTasksValidator(this.nowTasks, this.maxTasks),
                                                Validators.pattern(/^\d{1,3}$/)]);
        });
      });
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
