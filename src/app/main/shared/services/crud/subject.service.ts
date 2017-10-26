import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Subject} from '../../entities/subject';
import {SubjectDto} from './dto/subject-dto';
import {RecordsCount} from '../../entities/recordsCount';
import {urlConstants} from '../../constants/url-constants';

@Injectable()

export class SubjectService {
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

  getSubjects(limit: number, offset: number): Observable<[Subject[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<SubjectDto[]>(`${urlConstants.subjectUrl}${urlConstants.getRecordsRange}/${limit}/${offset}`)
        .map(subjectDtoArr => subjectDtoArr.map(SubjectService.toSubjectEntity)),
      this.http.get<RecordsCount>(`${urlConstants.subjectUrl}${urlConstants.getCount}`)
    );
  }

  getSubject(id: number): Observable<Subject[]> {
    return this.http.get<SubjectDto[]>(`${urlConstants.subjectUrl}${urlConstants.getRecords}${id}`)
      .map(subjectDtoArr => subjectDtoArr.map(SubjectService.toSubjectEntity));
  }

  addSubject(subject: Subject): Observable<SubjectDto> {
    return this.http.post(`${urlConstants.subjectUrl}${urlConstants.insertData}`, SubjectService.toSubjectDto(subject));
  }
}
