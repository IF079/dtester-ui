import {TestBed, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {StudentService} from './student.service';
import {url} from '../shared/constants/url-constants';

xdescribe('StudentService', () => {
  let http: HttpTestingController;
  let service: StudentService;

  const recordsCountResponse = {
    numberOfRecords: 3
  };
  const groupsResponse = [
    {
      groups_id: 1,
      groups_name: 'Група 1',
      speciality_id: 1,
      faculty_id: 1
    },
    {
      groups_id: 2,
      groups_name: 'Група 2',
      speciality_id: 2,
      faculty_id: 2
    },
    {
      groups_id: 3,
      groups_name: 'Група 3',
      speciality_id: 3,
      faculty_id: 3
    }
  ];
  const studentsResponse = [
    {
      user_id: 20,
      gradebook_id: 'UX-3311221',
      student_surname: 'Лящовський',
      student_name: 'Андрій',
      student_fname: 'Іванович',
      group_id: '2'
    }, {
      user_id: 13,
      gradebook_id: 'UY-3019273',
      student_surname: 'Заник',
      student_name: 'Іван',
      student_fname: 'Григорович',
      group_id: '5'
    }, {
      user_id: 155,
      gradebook_id: 'UT-1029384',
      student_surname: 'Лінкольн',
      student_name: 'Абрагім',
      student_fname: 'Зимонсович',
      group_id: '1'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentService]
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of students and count of records', (done) => {
    service.getStudentsRange(3, 0).subscribe(response => {
      done();
      expect(response[0].length).toBe(3);
      expect(response[0][0].studentSurname).toBe('Лящовський');
      expect(response[0][1].studentSurname).toBe('Заник');
      expect(response[0][2].studentSurname).toBe('Лінкольн');
    });

    http.expectOne(`${url.studentUrl}${url.getRecordsRange}/3/0`).flush(studentsResponse);
    http.expectOne(`${url.studentUrl}${url.getCount}`).flush(recordsCountResponse);
    http.verify();
  });

  it('should return student by surname', (done) => {
    service.getStudentBySurename('Заник').subscribe(student => {
      done();
      expect(student.length).toBe(1);
      expect(student[0].studentSurname).toBe('Заник');
    });

    http.expectOne(`${url.studentUrl}${url.getRecordsBySearch}/Заник`).flush([studentsResponse[1]]);
    http.verify();
  });

  it('should return array of students', (done) => {
    service.getStudentsByGroup(2).subscribe(students => {
      done();
      expect(students.length).toBe(3);
    });

    http.expectOne(`${url.studentUrl}${url.getStudentsByGroup}/2`).flush(studentsResponse);
    http.verify();
  });

  it('should return student', (done) => {
    service.getStudent(13).subscribe(student => {
      done();
      expect(student[0].userId).toBe(13);
      expect(student[0].gradebookId).toBe('UY-3019273');
      expect(student[0].studentSurname).toBe('Заник');
      expect(student[0].studentName).toBe('Іван');
      expect(student[0].studentFname).toBe('Григорович');
      expect(student[0].groupId).toBe('5');
    });

    http.expectOne(`${url.studentUrl}${url.getRecords}/13`).flush([studentsResponse[1]]);
    http.verify();
  });

  it('should return array of groups', (done) => {
    service.getGroups().subscribe(groups => {
      done();
      expect(groups[0].groups_id).toBe(1);
      expect(groups[0].groups_name).toBe('Група 1');
      expect(groups[1].groups_id).toBe(2);
      expect(groups[1].groups_name).toBe('Група 2');
      expect(groups[2].groups_id).toBe(3);
      expect(groups[2].groups_name).toBe('Група 3');
    });

    http.expectOne(`${url.groupUrl}${url.getRecords}`).flush(groupsResponse);
    http.verify();
  });

  it('should return boolean response is username already used, or not', (done) => {
    service.checkUserName('testUsername').subscribe(response => {
      done();
      expect(typeof response.response).toBe('boolean');
    });

    http.expectOne(`${url.adminUser}${url.checkUserName}/testUsername`).flush({response: true});
  });

  it('should return boolean response is email already used, or not', (done) => {
    service.checkEmailAddress('testEmail@gmail.com').subscribe(response => {
      done();
      expect(typeof response.response).toBe('boolean');
    });

    http.expectOne(`${url.adminUser}${url.checkEmailAddress}/testEmail@gmail.com`).flush({response: false});
  });

});
