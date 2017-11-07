import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import {SubjectModalComponent} from './subject-modal/subject-modal.component';
import {SubjectService} from './subject.service';
import {Subject} from './subject';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {generalConst} from '../shared/constants/general-constants';


@Component({
  selector: 'app-subjects',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})

export class SubjectComponent implements OnInit {
  headingColumnsOfTable = ['№', 'Назва', 'Опис', '', ''];
  btnAdd = 'Додати предмет';
  subjects: Subject[];
  errWithDisplayingSubjects: string;
  numberOfRecords: number;


  displayedColumns = ['id', 'name', 'description', 'edit', 'delete'];
  exampleDatabase = new ExampleDatabase(this.subjectService);
  dataSource: ExampleDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private subjectService: SubjectService, public dialog: MatDialog) {

  }

  openDialog() {
    const dialogRef = this.dialog.open(SubjectModalComponent, {
      height: '350px',
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getSubjects(): void {
    this.subjectService.getSubjects(20, 15).subscribe((data) => {
        this.subjects = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      },
      err => {
        log.error(err);
        this.errWithDisplayingSubjects = generalConst.errorWithDisplayData;
      });
  }

  ngOnInit() {
    this.getSubjects();
    this.dataSource = new ExampleDataSource(this.exampleDatabase);
  }
}

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** An example database that the data source uses to retrieve data for the table. */

export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  get data(): any[] {
    return this.dataChange.value;
  }

  numberOfRecords: number;

  constructor(private subjectService: SubjectService) {
    const copiedData = this.data.slice();
    this.subjectService.getSubjects(20, 15).subscribe((resp) => {
        this.dataChange.next(resp[0]);
        copiedData.push(resp[0]);
        console.log(copiedData);
        this.numberOfRecords = parseInt(resp[1].numberOfRecords, 10);
      },
      err => {
        log.error(err);
      });
    this.dataChange.next(copiedData);
  }

  /** Adds a new user to the database. */
  addUser() {

  }

  /** Builds and returns a new User. */
  private createNewUser() {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      description: Math.round(Math.random() * 100).toString(),
      edit: 'edit',
      delete: 'delete'
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    return this._exampleDatabase.dataChange;
  }

  disconnect() {
  }
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];


const log = LoggerFactory.create(SubjectComponent);
