import {ResultDto} from './result-dto';

export class Result {
  sessionId?: number;
  studentId: number;
  testId: number;
  sessionDate: string;
  startTime: string;
  endTime: string;
  result: string;
  questions: number;
  trueAnswers: string[];
  answers: string[];

  constructor(resultDto: ResultDto) {
    this.sessionId = resultDto.session_id;
    this.studentId = resultDto.student_id;
    this.testId = resultDto.test_id;
    this.sessionDate = resultDto.session_date;
    this.startTime = resultDto.start_time;
    this.endTime = resultDto.end_time;
    this.result = resultDto.result;
    this.questions = resultDto.questions;
    this.trueAnswers = resultDto.true_answers;
    this.answers = resultDto.answers;
  }

}