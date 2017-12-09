import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {InfoModalService} from '../../info-modal/info-modal.service';
import {TestService} from '../test.service';
import {Test} from '../test';
import {UpdateDeleteEntityService} from '../../shared/services/update-delete-entity-service/update-delete-entity.service';
import {generalConst} from '../../shared/constants/general-constants';
import {TestDto} from '../test-dto';

@Component({
  selector: 'dtest-edit-test-modal',
  templateUrl: './edit-test-modal.component.html',
  styleUrls: ['../add-test-modal/add-test-modal.component.scss']
})
export class EditTestModalComponent implements OnInit {
  attempts = this.setArrayOfDigit(10);
  viewHeadersArray = ['Тема', 'Завдань', 'Час', 'Спроби', 'Статус'];
  title = 'Редагувати тест';
  status = [{value: 1, text: 'Доступний'}, {value: 0, text: 'Недоступний'}];
  placeholders = {
    testName: 'Назва',
    tasks: 'Кількість завдань',
    timeForTest: 'Час для виконання тесту (хв)',
    enabled: 'Статус',
    attempts: 'Кількість спроб'
  };
  curentTest: Test;
  form: FormGroup;
  errorEmptyInput = 'Заповніть поле!';
  errorTestName = 'Поле повинно бути заповнене, та займати до 60 символів!';

  constructor(
    private testService: TestService,
    private formBuilder: FormBuilder,
    private modalService: InfoModalService,
    public dialogRef: MatDialogRef<EditTestModalComponent>,
    private delUpdateService: UpdateDeleteEntityService,
    private infoModal: InfoModalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.curentTest = this.data;
    this.createForm();
    this.form.patchValue({
      testName: data[1],
      tasks: data[2],
      timeForTest: data[3],
      enabled: data[4] === 'Доступний' ? 1 : 0,
      attempts: +data[5]
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      'testName': [null, [Validators.required, Validators.maxLength(60)]],
      'tasks': [null, [Validators.required, Validators.pattern(/^\d{1,3}$/)]],
      'timeForTest': [null, [Validators.required, Validators.pattern(/^\d{1,3}$/)]],
      'enabled': [null],
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

  editTest(): void {
    const entityName = 'Test';
    const test_name = this.form.get('testName').value;
    const tasks = +this.form.get('tasks').value;
    const time_for_test = this.form.get('timeForTest').value;
    const enabled = this.form.get('enabled').value;
    const attempts = this.form.get('attempts').value;
    this.dialogRef.close();
    if (!(
      test_name === this.curentTest[1] &&
      tasks === +this.curentTest[2] &&
      time_for_test === this.curentTest[3] &&
      enabled === (this.curentTest[4] === 'Доступний' ? 1 : 0) &&
      attempts === +this.curentTest[5]
    )) {
      this.testService.getTest(this.curentTest[0]).subscribe(response => {
        const subject_id = +response[0].subjectId;
        this.delUpdateService.updateEntity(this.curentTest[0], entityName, {
          subject_id,
          test_name,
          tasks,
          time_for_test,
          enabled,
          attempts
        }).subscribe((testData: TestDto[]) => {
          delete testData[0].subject_id;
          testData[0].enabled = this.status.find(item => item.value === +testData[0].enabled).text;
          this.delUpdateService.passUpdatedItem<TestDto[]>(testData);
          console.log(testData[0].enabled);
          this.modalService.openSuccessDialog(generalConst.updateMsg);
        },
        err => this.infoModal.openErrorDialog(generalConst.errorMsg));
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.dialogRef.updateSize('400px');
  }

}
