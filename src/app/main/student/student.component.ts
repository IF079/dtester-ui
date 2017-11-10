import {Component, OnInit} from '@angular/core';
import {MatDialog, MatPaginatorIntl, PageEvent} from '@angular/material';
import {Location} from '@angular/common';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {StudentService} from './student.service';
import {GroupsService} from '../groups/groups.service';
import {Student} from './student';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {generalConst} from '../shared/constants/general-constants';
import {StudentAddModalComponent} from './add-modal/add-modal.component';
import {InfoModalComponent} from './info-modal/info-modal.component';
import {MatPaginatorIntlUkr} from '../shared/entities/custom-mat-paginator';

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
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private location: Location
  ) {
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
      if (result && result.response === 'ok') {
        this.openInfoDialog();
      } else if (result && result.response !== 'ok') {
        this.openErrorDialog();
      }
    });
  }

  openErrorDialog(text = 'Щось пішло не так. Повторіть, будь ласка, спробу пізніше.') {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      height: '',
      width: '250px',
      data: {
        type: 'error',
        title: 'Помилка',
        text: text
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openInfoDialog() {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      height: '',
      width: '250px',
      data: {
        type: 'info',
        title: 'Успіх',
        text: 'Вітаю, Ви успішно додали нового студента!'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  parseGroups(): void {
    this.groupsService.getGroups().subscribe(data => {
      let localArr = [];
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
      this.students.forEach(student => {
        delete student.photo;
        delete student.plainPassword;
        delete student.groupId;
      });
    },
    err => {
      this.openErrorDialog('На даний момент немає даних, які відносяться до цієї групи.');
    });
  }

  getStudents(): void {
    this.studentService.getStudentsRange(this.limit, this.offset).subscribe(data => {
        this.students = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
        this.students.forEach(item => {
          delete item.photo;
          delete item.plainPassword;
        });
      },
      err => {
        log.error(err);
        this.openErrorDialog();
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
