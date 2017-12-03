import {Injectable} from '@angular/core';

@Injectable()
export class SpinnerService {
  tasksCounter = 0;

  constructor() {
  }

  addTask(): void {
    this.tasksCounter++;
  }

  removeTask(): void {
    if (this.tasksCounter < 0) {
      throw new Error('No tasks to remove');
    }
    this.tasksCounter--;
  }

  needsSpinner(): boolean {
    return this.tasksCounter > 0;
  }

}
