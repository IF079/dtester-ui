import {Question} from './question';

export class QuestionDto {
  question_id: number;
  test_id: number;
  question_text: string;
  level: number;
  type: string;
  attachment: string;

  constructor(question: Question) {
    this.question_id = question.questionId;
    this.test_id = question.testId;
    this.question_text = question.questionText;
    this.level = question.level;
    this.type = question.type;
    this.attachment = question.attachment;
  }
}
