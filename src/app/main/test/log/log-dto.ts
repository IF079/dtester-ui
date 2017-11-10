import {Log} from './log';

export class LogDto {
  log_id: number;
  user_id: number;
  test_id: number;
  log_date: string;
  log_time: string;
  remote_ip: string;

  constructor(log: Log) {
    this.log_id = log.logId;
    this.user_id = log.userId;
    this.test_id = log.testId;
    this.log_date = log.logDate;
    this.log_time = log.logTime;
    this.remote_ip = log.remoteIp;
  }

}
