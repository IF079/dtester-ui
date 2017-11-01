import {Injectable} from '@angular/core';

import {SPINNER_DEFAULT_CONFIG} from './spinner.default.config';

@Injectable()
export class SpinnerService {
  private tasksCounter = 0;
  private takesTooMuchTime = false;

  constructor() {
  }

  addTask(): void {
    this.tasksCounter++;
    setTimeout(() => {
      if (this.hasTasks()) {
        this.takesTooMuchTime = true;
      }
    }, SPINNER_DEFAULT_CONFIG.TIMEOUT);
  }

  removeTask(): void {
    if (this.tasksCounter < 0) {
      throw new Error('No tasks to remove');
    }
    if (this.tasksCounter === 0) {
      this.takesTooMuchTime = false;
    }
    this.tasksCounter--;
  }

  needsSpinner(): boolean {
    return this.hasTasks() && this.takesTooMuchTime;
  }

  private hasTasks(): boolean {
    return this.tasksCounter > 0;
  }
}