import {Component, OnInit, ViewChild} from '@angular/core';

import {SpecialityService} from './speciality.service';
import {Speciality} from './speciality';
import {generalConst} from '../shared/constants/general-constants';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {MatDialog, MatPaginator} from '@angular/material';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import {RecordsCount} from '../shared/entities/recordsCount';
import {PageEvent} from '@angular/material';


@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})

export class SpecialityComponent implements OnInit {
  specialities: Speciality[];
  pageEvent: PageEvent;
  headingColumnsOfTable = ['№', 'Код', 'Назва', 'edit', 'delete'];
  modalInfo = {
    btnAdd: 'Додати',
    btnClose: 'Закрити',
    btnAddSpeciality: 'Додати Спеціальність',
    placeholderCode: 'Код Спеціальності',
    placeholderName: 'Назва Спеціальності',
  };
  specialityDatabase: SpecialityDatabase | null;
  dataSource: SpecialityDataSource | null;
  errWithDisplayingSpeciality: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private specialityService: SpecialityService,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.specialityDatabase = new SpecialityDatabase(this.specialityService, this.pageEvent.pageIndex);
    this.dataSource = new SpecialityDataSource(this.specialityDatabase, this.paginator);
  }


}

export class SpecialityDatabase {
  limit = 10;
  offset = 0;

  constructor(private specialityService: SpecialityService, public pageIndex) {

  }

  getSpecialities(): Observable<[Speciality[], RecordsCount]> {
    console.log(this.pageIndex);
      return this.specialityService.getSpeciality(this.limit, this.offset);
  }
}

export class SpecialityDataSource extends DataSource<Speciality> {
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  constructor(private sDatabase: SpecialityDatabase,
              private paginator: MatPaginator) {
    super();
  }

  connect(): Observable<Speciality[]> {
    const dSChange = [
      this.paginator.page,
    ];
    return Observable.merge(...dSChange)
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        return this.sDatabase.getSpecialities();
      })
      .map(data => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = parseInt(data[1].numberOfRecords, 10);

        return data[0];
      })
      .catch(() => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        return Observable.of([]);
      });
  }

  disconnect() {
  }
}
