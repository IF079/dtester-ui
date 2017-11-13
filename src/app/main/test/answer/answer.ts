import {AnswerDto} from './answer-dto';

export class Answer {
  answerId?: number;
  questionId: number;
  trueAnswer: number;
  answerText: string;
  attachment: string;

  constructor(answerDto: AnswerDto) {
    this.answerId = answerDto.answer_id;
    this.questionId = answerDto.question_id;
    this.trueAnswer = answerDto.true_answer;
    this.answerText = answerDto.answer_text;
    this.attachment = answerDto.attachment;
  }

}
