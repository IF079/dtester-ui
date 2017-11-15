import {Component, OnInit} from '@angular/core';
import {MatDialog, MatPaginatorIntl, PageEvent} from '@angular/material';
import {Location} from '@angular/common';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {StudentService} from './student.service';
import {GroupsService} from '../groups/groups.service';
import {Student} from './student';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {StudentAddModalComponent} from './add-modal/add-modal.component';
import {MatPaginatorIntlUkr} from '../shared/entities/custom-mat-paginator';
import {InfoModalService} from '../info-modal/info-modal.service';
import {UpdateDeleteEntityService} from '../entity-table/update-delete-entity.service';

@Component({
  selector: 'app-students',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlUkr}]
})

export class StudentComponent implements OnInit {
  limit = 10;
  offset = 0;
  pageSizeOptions = [5, 10, 25, 100];
  students: Student[];
  student: Student;
  headingColumnsOfTable = ['№', '№ Залікової книжки', 'Прізвище', 'Ім\'я', 'По-батькові'];
  errWithDisplayingStudents: string;
  numberOfRecords: number;
  groupId: number;
  groups: any[];

  constructor(
    private studentService: StudentService,
    private groupsService: GroupsService,
    private delUpdateService: UpdateDeleteEntityService,
    private infoModal: InfoModalService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.updateNumberOfRecordsInDomWhenAdded();
    this.updateNumberOfRecordsInDomWhenDeleted();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(StudentAddModalComponent, {
      height: '',
      width: '800px',
      data: {
        groups: this.groups,
        groupId: this.groupId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  parseGroups(): void {
    this.groupsService.getGroups().subscribe(data => {
      const localArr = [];
      data[0].forEach(group => {
        localArr.push({
          value: group.group_id,
          text: group.group_name
        });
      });
      this.groups = localArr;
    });
  }

  getStudentsByGroup(groupId: number): void {
    this.studentService.getStudentsByGroup(groupId).subscribe(data => {
      this.students = data;
      this.numberOfRecords = data.length;
      this.students.forEach(student => {
        delete student.photo;
        delete student.plainPassword;
        delete student.groupId;
      });
    },
    error => this.infoModal.openInfoDialog('Увага', 'На даний момент тут немає записів.'));
  }

  getStudents(): void {
    this.studentService.getStudentsRange(this.limit, this.offset).subscribe(studentData => {
        this.students = studentData[0];
        this.students.forEach(item => {
          delete item.photo;
          delete item.plainPassword;
        });
      },
      error => this.infoModal.openInfoDialog('Увага', 'На даний момент тут немає записів.'));
  }

  updateNumberOfRecordsInDomWhenAdded() {
    this.delUpdateService.studentInserted$.subscribe(() => {
        this.numberOfRecords += 1;
      });
  }

  updateNumberOfRecordsInDomWhenDeleted() {
    this.delUpdateService.recordDeletedInDataBase$.subscribe(() => {
        this.numberOfRecords -= 1;
      });
  }

  goPage(pageEvent: PageEvent) {
    this.limit = pageEvent.pageSize;
    this.offset = ((pageEvent.pageIndex + 1) * pageEvent.pageSize) - pageEvent.pageSize;
    this.getStudents();
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.parseGroups();
    this.route.paramMap.subscribe( (params: ParamMap) => {
        this.groupId = +params.get('groupId');
        this.getStudentsByGroup(this.groupId);
    });
  }
}

const log = LoggerFactory.create(StudentComponent);
