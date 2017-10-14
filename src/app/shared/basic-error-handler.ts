import {ErrorHandler} from '@angular/core';
import {LoggerFactory} from './logger/logger.factory';
import {HttpErrorResponse} from '@angular/common/http';

export class BasicErrorHandler extends ErrorHandler {

  constructor() {
    super();
  }

  handleError(err: any): void {
    if (err instanceof HttpErrorResponse) {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        log.error('An error occurred:', err.error.message);
      } else {
        if (err.error instanceof ProgressEvent) {
          // Probably because of CORS
          log.error('Your browser prevented request from sending');
          super.handleError(err);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          log.error(err.message);
          log.error(err.error);
          log.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    } else {
      log.error(err);
    }
  }
}

const log = LoggerFactory.create(BasicErrorHandler);
