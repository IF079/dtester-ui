import {TestBed, ComponentFixture, async, inject} from '@angular/core/testing';
import {MainMaterialModule} from '../main-material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import 'rxjs/add/observable/of';
import {MockSubjectService} from '../../../../mocks/subject/subject.service.mock';
import {UpdateDeleteEntityService} from '../shared/services/update-delete-entity-service/update-delete-entity.service';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {SubjectComponent} from './subject.component';
import {SubjectService} from './subject-service/subject.service';


describe('SubjectComponent', () => {
  let fixture: ComponentFixture<SubjectComponent>;
  let component: SubjectComponent;
  const mockSubjectService = new MockSubjectService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MainMaterialModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        UpdateDeleteEntityService,
        { provide: SubjectService, useValue: mockSubjectService },
    ]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectComponent);
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

  it('should open dialog  for inserting data', () => {
    const spy = spyOn(component, 'openDialog');
    const button = fixture.debugElement.nativeElement.querySelector('.addButton');
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should return array of subjects and number of records', (done) => {
    component.getSubjects();
    mockSubjectService.getSubjectsRange().subscribe((resp) => {
      expect(component.subjects).toEqual(resp[0]);
      expect(component.numberOfRecords).toEqual(parseInt(resp[1].numberOfRecords, 10));
      done();
    });

  });
});
