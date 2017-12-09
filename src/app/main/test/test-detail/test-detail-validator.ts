import {AbstractControl} from '@angular/forms';

export class TestDetailValidator {
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

  static createEditLevelValidator(curentLevel: string, levels: string[]) {
    return (control: AbstractControl) => {
      const controlLevel = '' + control.value;
      curentLevel = '' + curentLevel;
      return curentLevel !== controlLevel && levels.indexOf(controlLevel) > -1 ? {levelAlreadyExist: true} : null;
    };
  }
}
