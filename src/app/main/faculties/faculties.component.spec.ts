import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FacultiesComponent} from './faculties.component';
import {MainMaterialModule} from '../main-material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FacultyService} from './faculty.service';
import {UpdateDeleteEntityService} from '../shared/services/update-delete-entity-service/update-delete-entity.service';
import {FacultyServiceMock} from '../../../../mocks/faculty/faculty.service.mock';

describe('FacultiesComponent', () => {

  let fixture: ComponentFixture<FacultiesComponent>;
  let component: FacultiesComponent;
  const facultyServiceMock = new FacultyServiceMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacultiesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MainMaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: FacultyService, useValue: facultyServiceMock},
        UpdateDeleteEntityService
      ]
    });
    fixture = TestBed.createComponent(FacultiesComponent);
    component = fixture.debugElement.componentInstance;
  });

  it ('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the EntityTable component inside html template', () => {
    const table = fixture.debugElement.query(By.css('dtest-entity-table'));
    expect(table).toBeTruthy();
  });

  /*it('should return array of faculties and number of records', (done) => {
    component.getFacultiesRange();
    facultyServiceMock.getFaculties().subscribe((resp) => {
      expect(component.faculties).toEqual(resp[0]);
      expect(component.numberOfRecords).toEqual(resp[1].numberOfRecords, 10);
      done();
    });
  });*/
});
