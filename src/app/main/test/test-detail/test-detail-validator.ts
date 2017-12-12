import {AbstractControl} from '@angular/forms';

import {TestDetailService} from './test-detail.service';

export class TestDetailValidator {
  static createTasksValidator(now: number, max: number) {
    return (control: AbstractControl) => {
      const tasksAmount = control ? +control.value : 0;
      return tasksAmount + now > max ? {invalidTasksAmount: true} : null;
    };
  }

  static createAsyncTasksValidator(max: number, testDetailService: TestDetailService, testId: number) {
    return (control: AbstractControl) => {
      const tasksAmount = control ? +control.value : 0;
      let now = 0;
      return testDetailService.getTestDetailsByTestId(testId).map(details => {
        details.forEach(item => {
          now += +item.tasks;
        });
        return tasksAmount + now > max ? {invalidTasksAmount: true} : null;
      });
    };
  }

  static createAsyncLevelValidator(testDetailService: TestDetailService, testId: number) {
    return (control: AbstractControl) => {
      const controlLevel = '' + control.value;
      const levels = [];
      return testDetailService.getTestDetailsByTestId(testId).map(details => {
        details.forEach(item => {
          levels.push(item.level);
        });
        return levels.indexOf(controlLevel) > -1 ? {levelAlreadyExist: true} : null;
      });
    };
  }

  static createEditLevelValidator(curentLevel: string, levels: string[]) {
    return (control: AbstractControl) => {
      const controlLevel = '' + control.value;
      curentLevel = '' + curentLevel;
      return curentLevel !== controlLevel && levels.indexOf(controlLevel) > -1 ? {levelAlreadyExist: true} : null;
    };
  }
}
