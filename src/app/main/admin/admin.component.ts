import {Component, OnInit} from '@angular/core';
import {MatDialog, MatPaginatorIntl, PageEvent} from '@angular/material';
import {Admin} from './admin-classes/Admin';
import {AdminService} from './admin-services/admin.service';
import {LoggerFactory} from '../../shared/logger/logger.factory';
import {MatPaginatorIntlUkr} from '../shared/entities/custom-mat-paginator';
import {UpdateDeleteEntityService} from '../shared/services/update-delete-entity-service/update-delete-entity.service';
import {generalConst} from '../shared/constants/general-constants';

@Component({
  selector: 'dtest-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlUkr}]
})

export class AdminComponent implements OnInit {
  limit = 10;
  offset = 0;
  pageSizeOptions = [5, 10, 25, 100];
  admins: Admin[];
  headingColumnsOfTable = ['№', 'Логін', 'Поштова скринька'];
  errWithDisplayingAdmins: string;
  numberOfRecords: number;
  constructor(
    private adminService: AdminService,
    private delUpdateService: UpdateDeleteEntityService,
    private dialog: MatDialog,
  ) {

  }


  getAdmins() {
    this.adminService.getAdminsRange(this.limit, this.offset).subscribe(data => {
        this.admins = data[0].map(admin => ({
          id: admin.id,
          username: admin.username,
          email: admin.email
        }));
        this.numberOfRecords = parseInt(data[1].numberOfRecords, 10);
      },
      err => {
        this.errWithDisplayingAdmins = generalConst.errorWithDisplayData;
      });
  }

  goPage(pageEvent: PageEvent) {
    this.limit = pageEvent.pageSize;
    this.offset = ((pageEvent.pageIndex + 1) * pageEvent.pageSize) - pageEvent.pageSize;
    this.getAdmins();
  }


  ngOnInit() {

    this.getAdmins();
  }
}

const log = LoggerFactory.create(AdminComponent);
