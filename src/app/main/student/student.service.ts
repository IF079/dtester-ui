import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Student} from './student';
import {StudentDto, OtherDtoInfo} from './student-dto';
import {RecordsCount} from '../shared/entities/recordsCount';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {url} from '../shared/constants/url-constants';

@Injectable()

export class StudentService {
  constructor(private http: HttpClient) {
  }

  getStudentsRange(limit: number, offset: number): Observable<[Student[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<StudentDto[]>(`${url.studentUrl}${url.getRecordsRange}/${limit}/${offset}`)
        .map( studentDtoArr => studentDtoArr.map(studentDto => new Student(studentDto))),
      this.http.get<RecordsCount>(`${url.studentUrl}${url.getCount}`)
    );
  }

  getStudentsByGroup(groupId: number): Observable<Student[]> {
    return this.http.get<StudentDto[]>(`${url.studentUrl}${url.getStudentsByGroup}/${groupId}`)
      .map( studentDtoArr => studentDtoArr.map( studentDto => new Student(studentDto) ) );
  }

  getStudentBySurename(surename: string) {
    return this.http.get<StudentDto[]>(`${url.studentUrl}${url.getRecordsBySearch}/${surename}`)
      .map( studentDtoArr => studentDtoArr.map(studentDto => new Student(studentDto)));
  }

  getStudent(id: number): Observable<Student[]> {
    return this.http.get<StudentDto[]>(`${url.studentUrl}${url.getRecords}/${id}`)
      .map( studentDtoArr => studentDtoArr.map(studentDto => new Student(studentDto)));
  }

  setStudent(student: Student, otherInfo: OtherDtoInfo): Observable<any> {
    return this.http.post(`${url.studentUrl}${url.insertData}`, new StudentDto(student, otherInfo));
  }
}

const log = LoggerFactory.create(StudentService);
