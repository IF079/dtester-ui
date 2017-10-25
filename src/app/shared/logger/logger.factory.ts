import {Log} from 'ng2-logger';
import {Logger} from 'ng2-logger/src/logger';
import {LOGGER_COLOURS} from './logger-colors';

const log = Log.create('LoggerFactory');

export class LoggerFactory {
  static create(forClass: Function): Logger<any> {
    const logger = Log.create(forClass.name);
    const classType = forClass.name.split(/(?=[A-Z])/).pop();
    logger.color = LOGGER_COLOURS[classType.toLowerCase()];
    log.color = logger.color;
    log.info(forClass.name, {type: classType, forClass: forClass});
    return logger;
  }
}
