import {Subject} from './subject';

export class SubjectDto {
  subject_id?: number;
  subject_name: string;
  subject_description: string;

  constructor(subject: Subject) {
    this.subject_name = subject.name;
    this.subject_description = subject.description;
  }

}
