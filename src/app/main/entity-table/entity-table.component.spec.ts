import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicEntityGridComponent } from './basic-entity-grid.component';

describe('BasicEntityGridComponent', () => {
  let component: BasicEntityGridComponent;
  let fixture: ComponentFixture<BasicEntityGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicEntityGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicEntityGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
