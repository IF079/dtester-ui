import {Answer} from './answer';

export class AnswerDto {
  answer_id: number;
  question_id: number;
  true_answer: number;
  answer_text: string;
  attachment: string;

  constructor(answer: Answer) {
    this.answer_id = answer.answerId;
    this.question_id = answer.questionId;
    this.true_answer = answer.trueAnswer;
    this.answer_text = answer.answerText;
    this.attachment = answer.attachment;
  }

}
