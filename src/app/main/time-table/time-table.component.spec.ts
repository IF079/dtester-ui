import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {TimeTableComponent} from './time-table.component';
import {TimeTableService} from './time-table.service';
import {MainMaterialModule} from '../main-material.module';
import {UpdateDeleteEntityService} from '../entity-table/update-delete-entity.service';
import {TimeTableServiceMock} from './time-table.service.mock';

describe('TimeTableComponent', () => {
  let component: TimeTableComponent;
  let fixture: ComponentFixture<TimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeTableComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MainMaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: TimeTableService, useValue: new TimeTableServiceMock()},
        UpdateDeleteEntityService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });
  it(`it should have a button 'Додати розклад'`, () => {
    expect(component.btnAdd).toEqual('Додати розклад');
  });

  it('ngOnInit should set up timetableData', inject([TimeTableService], (timetableService: TimeTableService) => {
    expect(component.timetables.length).toEqual(1);
  }));
});
