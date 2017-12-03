import {TestBed, ComponentFixture, async, inject} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MainMaterialModule} from '../main-material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {StudentComponent} from './student.component';
import {StudentService} from './student.service';
import {Student} from './student';
import {RecordsCount} from '../shared/entities/recordsCount';
import {Group} from '../groups/group';
import {GroupsService} from '../groups/groups-service/groups.service';
import {UpdateDeleteEntityService} from '../entity-table/updateDeleteEntityService/update-delete-entity.service';
import {InfoModalService} from '../info-modal/info-modal.service';
import {MockStudentService} from './student.service.mock';

class MockGroupsService {
  getGroups() {
    return Observable.of([[{
      group_id: 1,
      group_name: 'First group',
      speciality_id: 2,
      faculty_id: 3
    }, {
      group_id: 4,
      group_name: 'Second group',
      speciality_id: 5,
      faculty_id: 6
    }, {
      group_id: 7,
      group_name: 'Third group',
      speciality_id: 8,
      faculty_id: 9
    }], {
      numberOfRecords: '3'
    }]);
  }
}

describe('StudentComponent', () => {
  let fixture: ComponentFixture<StudentComponent>;
  let component: StudentComponent;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    paramMap: Observable.of({
      get() { return '1'; }
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MainMaterialModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      providers: [
        InfoModalService,
        UpdateDeleteEntityService,
        RouterTestingModule,
        { provide: StudentService, useClass: MockStudentService },
        { provide: GroupsService, useClass: MockGroupsService },
        { provide: ActivatedRoute, useValue: mockRouter}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the EntityTable component inside html template', () => {
    const table = fixture.debugElement.query(By.css('dtest-entity-table'));
    expect(table).toBeTruthy();
  });

  it('should open AddDialog when AddButton clicked', () => {
    const spy = spyOn(component, 'openAddDialog');
    const button = fixture.debugElement.nativeElement.querySelector('.addButton');
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should return array of students', inject([StudentService], (studentService: StudentService) => {

    component.getStudents();

    expect(component.students).toEqual([
      {
        userId: 20,
        gradebookId: 'UX-3311221',
        studentSurname: 'Лящовський',
        studentName: 'Андрій',
        studentFname: 'Іванович',
        groupId: '2'
      }, {
        userId: 13,
        gradebookId: 'UY-3019273',
        studentSurname: 'Заник',
        studentName: 'Іван',
        studentFname: 'Григорович',
        groupId: '5'
      }, {
        userId: 155,
        gradebookId: 'UT-1029384',
        studentSurname: 'Лінкольн',
        studentName: 'Абрагім',
        studentFname: 'Зимонсович',
        groupId: '1'
    }]);
  }));

  it('should return array of objects with group names and ids', inject([GroupsService], (groupsService: GroupsService) => {
    component.parseGroups();
    expect(component.groups).toEqual([{
      value: 1,
      text: 'First group'
    }, {
      value: 4,
      text: 'Second group'
    }, {
      value: 7,
      text: 'Third group'
    }]);

  }));

  it('should return array of students with length and without photo, plainPassword and groupId',
      inject([StudentService], (studentService: StudentService) => {

    component.getStudentsByGroup(null);

    expect(component.numberOfRecords).toEqual(3);
    expect(component.students).toEqual([{
        userId: 20,
        gradebookId: 'UX-3311221',
        studentSurname: 'Лящовський',
        studentName: 'Андрій',
        studentFname: 'Іванович'
      }, {
        userId: 13,
        gradebookId: 'UY-3019273',
        studentSurname: 'Заник',
        studentName: 'Іван',
        studentFname: 'Григорович'
      }, {
        userId: 155,
        gradebookId: 'UT-1029384',
        studentSurname: 'Лінкольн',
        studentName: 'Абрагім',
        studentFname: 'Зимонсович'
    }]);
  }));

  it('should run parseGroups method when page opened', () => {
    const spy = spyOn(component, 'parseGroups');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

});
