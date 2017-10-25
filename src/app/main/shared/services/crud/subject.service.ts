import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Subject} from '../../entities/subject';
import {SubjectDto} from './dto/subject-dto';
import {RecordsCount} from '../../entities/recordsCount';

@Injectable()

export class SubjectService {
  URL = '/Subject';
  constructor(private http: HttpClient) {
  }

  static toSubjectDto(subject: Subject): SubjectDto {
    const dto = new SubjectDto();
    dto.subject_name = subject.name;
    dto.subject_description = subject.description;
    return dto;
  }

  static toSubjectEntity(subjectDto: SubjectDto): Subject {
    const entity = new Subject();
    entity.id = subjectDto.subject_id;
    entity.name = subjectDto.subject_name;
    entity.description = subjectDto.subject_description;
    return entity;
  }

  getSubjects(limit: number, offset: number): Observable<Subject[]> {
    return this.http.get<SubjectDto[]>(`${this.URL}/getRecordsRange/${limit}/${offset}`)
      .map(subjectDtoArr => subjectDtoArr.map(SubjectService.toSubjectEntity));
  }

  getSubject(id: number): Observable<Subject[]> {
    return this.http.get<SubjectDto[]>(`${this.URL}/getRecords/${id}`)
      .map(subjectDtoArr => subjectDtoArr.map(SubjectService.toSubjectEntity));
  }

  addSubject(subject: Subject): Observable<SubjectDto> {
    return this.http.post(`${this.URL}/insertData`, SubjectService.toSubjectDto(subject));
  }

  countSubjects(): Observable<RecordsCount> {
    return this.http.get(`${this.URL}/countRecords`);
  }
}
