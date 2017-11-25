import {TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {FacultiesComponent} from './faculties.component';
import {MainMaterialModule} from '../main-material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FacultyService} from './faculty.service';
import {UpdateDeleteEntityService} from '../entity-table/update-delete-entity.service';

describe('FacultiesComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacultiesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MainMaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: FacultyService, /*useValue: new FacultyService()*/},
        UpdateDeleteEntityService
      ]
    });
  });

  it ('should create component instance', () => {
    const fixture = TestBed.createComponent(FacultiesComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});
