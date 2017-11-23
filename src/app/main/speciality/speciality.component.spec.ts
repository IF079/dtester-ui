import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {SpecialityComponent} from './speciality.component';
import {SpecialityService} from './speciality-service/speciality.service';
import {MainMaterialModule} from '../main-material.module';
import {UpdateDeleteEntityService} from '../entity-table/update-delete-entity.service';
import {SpecialityServiceMock} from './speciality-service/speciality.service.mock';

describe('SpecialityComponent', () => {
  let component: SpecialityComponent;
  let fixture: ComponentFixture<SpecialityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialityComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MainMaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: SpecialityService, useValue: new SpecialityServiceMock() },
        UpdateDeleteEntityService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set up tableData', inject([SpecialityService], (specialityService: SpecialityService) => {
    expect(component.specialities.length).toEqual(1);
  }));
});
