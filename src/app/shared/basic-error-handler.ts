import {ErrorHandler} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {LoggerFactory} from './logger/logger.factory';

export class BasicErrorHandler extends ErrorHandler {
  log = LoggerFactory.create(BasicErrorHandler);

  handleError(err: any): void {
    if (err instanceof HttpErrorResponse) {
      if (err.error instanceof Error) {
        this.log.error('An error occurred:', err.error.message);
      } else {
        if (err.error instanceof ProgressEvent) {
          this.log.error('Your browser prevented request from sending');
          super.handleError(err);
        } else {
          this.log.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    } else {
      super.handleError(err);
    }
  }
}


