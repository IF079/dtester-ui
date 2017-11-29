import {LogDto} from './log-dto';

export class Log {
  logId: number;
  userId: number;
  testId: number;
  logDate: string;
  logTime: string;
  remoteIp: string;

  constructor(logDto: LogDto) {
    this.logId = logDto.log_id;
    this.userId = logDto.user_id;
    this.testId = logDto.test_id;
    this.logDate = logDto.log_date;
    this.logTime = logDto.log_time;
    this.remoteIp = logDto.remote_ip;
  }
}
