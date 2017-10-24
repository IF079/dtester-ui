import {Injectable} from '@angular/core';
import {LoggerFactory} from '../../../shared/logger/logger.factory';
import {spinnerDefaultConfig} from '../config/spinner.default.config';

@Injectable()
export class SpinnerService {

  private timeout = spinnerDefaultConfig.timeout;

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
    }, this.timeout);
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

const log = LoggerFactory.create(SpinnerService);
