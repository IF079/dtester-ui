import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {StudentService} from './student.service';
import {GroupsService} from '../groups/groups.service';
import {Student} from './student';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {generalConst} from '../shared/constants/general-constants';
import {StudentAddModalComponent} from './add-modal/add-modal.component';
import {InfoModalComponent} from './info-modal/info-modal.component';

@Component({
  selector: 'app-students',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {
  students: Student[];
  student: Student;
  headingColumnsOfTable = ['№', '№ Залікової книжки', 'Прізвище', 'Ім\'я', 'По-батькові', '№ групи' , '', ''];
  errWithDisplayingStudents: string;
  numberOfRecords: number;
  groups: any[];

  constructor(
    private studentService: StudentService,
    private groupsService: GroupsService,
    private dialog: MatDialog
  ) {
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(StudentAddModalComponent, {
      height: '',
      width: '800px',
      data: {
        groups: this.groups
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.response === 'ok') {
        this.openInfoDialog();
      }
    });
  }

  openInfoDialog() {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      height: '',
      width: '250px'
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

  getStudents(): void {
    this.studentService.getStudents(10, 0).subscribe(data => {
        this.students = data[0];
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
        this.students.forEach(item => {
          delete item.photo;
          delete item.plainPassword;
        });
      },
      err => {
        log.error(err);
        this.errWithDisplayingStudents = generalConst.errorWithDisplayData;
      });
  }

  ngOnInit() {
    this.getStudents();
    this.parseGroups();
  }
}

const log = LoggerFactory.create(StudentComponent);
