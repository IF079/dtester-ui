import {SubjectDto} from './subject-dto';

export class Subject {
  id: number;
  name: string;
  description: string;
  constructor(subjectDto: SubjectDto) {
    this.id = subjectDto.subject_id;
    this.name = subjectDto.subject_name;
    this.description = subjectDto.subject_description;
  }
}
