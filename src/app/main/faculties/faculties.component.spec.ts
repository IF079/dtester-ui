import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {FacultiesComponent} from './faculties.component';
import {MainMaterialModule} from '../main-material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FacultyService} from './faculty.service';
import {UpdateDeleteEntityService} from '../shared/services/update-delete-entity-service/update-delete-entity.service';
import {FacultyServiceMock} from './faculty.service.mock';

describe('FacultiesComponent', () => {

  let fixture: ComponentFixture<FacultiesComponent>;
  let component: FacultiesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacultiesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MainMaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: FacultyService, useValue: new FacultyServiceMock()},
        UpdateDeleteEntityService
      ]
    });
    fixture = TestBed.createComponent(FacultiesComponent);
    component = fixture.debugElement.componentInstance;
  });

  it ('should create component', () => {
    expect(component).toBeTruthy();
  });
});
