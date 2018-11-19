import {Result} from './result';

export class ResultDto {
  session_id?: number;
  student_id: number;
  test_id: number;
  session_date: string;
  start_time: string;
  end_time: string;
  result: string;
  questions: number;
  true_answers: string[];
  answers: string[];

  constructor(result: Result) {
    this.session_id = result.sessionId;
    this.student_id = result.studentId;
    this.test_id = result.testId;
    this.session_date = result.sessionDate;
    this.start_time = result.startTime;
    this.end_time = result.endTime;
    this.result = result.result;
    this.questions = result.questions;
    this.true_answers = result.trueAnswers;
    this.answers = result.answers;
  }
}
