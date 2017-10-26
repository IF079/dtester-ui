import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Student} from '../../entities/student';
import {StudentDto} from './dto/student-dto';
import {RecordsCount} from '../../entities/recordsCount';
import {LoggerFactory} from '../../../../shared/logger/logger.factory';
import {urlConstants} from '../../constants/url-constants';

class OtherDtoInfo {
  password: string;
  passwordConfirm: string;
  email: string;
  username: string;
}

@Injectable()

export class StudentService {
  constructor(private http: HttpClient) {
  }

  static parseStudent(student: Student, otherDtoInfo: OtherDtoInfo): StudentDto {
    const dto = new StudentDto();
    dto.gradebook_id = student.gradebookId;
    dto.student_surname = student.studentSurname;
    dto.student_name = student.studentName;
    dto.student_fname = student.studentFname;
    dto.group_id = student.groupId;
    dto.photo = student.photo;
    dto.username = otherDtoInfo.username;
    dto.password = otherDtoInfo.password;
    dto.password_confirm = otherDtoInfo.passwordConfirm;
    dto.plain_password = otherDtoInfo.password;
    dto.email = otherDtoInfo.email;
    return dto;
  }

  static toStudent(studentDto: StudentDto): Student {
    const entity = new Student();
    entity.userId = studentDto.user_id;
    entity.gradebookId = studentDto.gradebook_id;
    entity.studentSurname = studentDto.student_surname;
    entity.studentName = studentDto.student_name;
    entity.studentFname = studentDto.student_fname;
    entity.groupId = studentDto.group_id;
    entity.plainPassword = studentDto.plain_password;
    entity.photo = studentDto.photo;
    return entity;
  }

  getStudents(limit: number, offset: number): Observable<[Student[], RecordsCount]> {
    return Observable.forkJoin(
      this.http.get<StudentDto[]>(`${urlConstants.studentUrl}${urlConstants.getRecordsRange}/${limit}/${offset}`)
        .map( studentDtoArr => studentDtoArr.map(StudentService.toStudent)),
      this.http.get<RecordsCount>(`${urlConstants.studentUrl}${urlConstants.getCount}`)
    );
  }

  getStudent(id: number): Observable<Student[]> {
    return this.http.get<StudentDto[]>(`${urlConstants.studentUrl}${urlConstants.getRecords}/${id}`)
      .map( studentDtoArr => studentDtoArr.map(StudentService.toStudent));
  }

  setStudent(student: Student, otherInfo: OtherDtoInfo): Observable<any> {
    return this.http.post(`${urlConstants.studentUrl}${urlConstants.insertData}`, StudentService.parseStudent(student, otherInfo));
  }
}

const log = LoggerFactory.create(StudentService);
