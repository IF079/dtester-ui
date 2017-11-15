import {QuestionDto} from './question-dto';

export class Question {
  questionId?: number;
  testId: number;
  questionText: string;
  level: number;
  type: number;
  attachment: string;

  constructor(questionDto: QuestionDto) {
    this.questionId = questionDto.question_id;
    this.testId = questionDto.test_id;
    this.questionText = questionDto.question_text;
    this.level = questionDto.level;
    this.type = questionDto.type;
    this.attachment = questionDto.attachment;
  }
}
