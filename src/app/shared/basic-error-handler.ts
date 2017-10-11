import {ErrorHandler} from '@angular/core';
import {LoggerFactory} from './logger/logger.factory';

export class BasicErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    log.error(error);
  }
}

const log = LoggerFactory.create(BasicErrorHandler);
