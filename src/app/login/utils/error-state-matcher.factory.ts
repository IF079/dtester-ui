import {ErrorStateMatcher} from '@angular/material';

export class ErrorStateMatcherFactory {
  static create(isErrorState: boolean): ErrorStateMatcher {
    return {
      isErrorState(): boolean {
        return isErrorState;
      }
    };
  }

  static createWithFunction(fn: Function): ErrorStateMatcher {
    return {
      isErrorState(): boolean {
        return fn();
      }
    };
  }
}
