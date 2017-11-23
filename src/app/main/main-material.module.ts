import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatSortModule,
  MatPaginatorModule,
  MatTableModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule,
  MatSelectModule,
  MatCheckboxModule, MatPaginatorIntl
} from '@angular/material';

import {MatPaginatorIntlUkr} from './shared/entities/custom-mat-paginator';

@NgModule({
  imports: [MatSortModule, MatPaginatorModule, MatTableModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule, MatCardModule, MatDialogModule, MatSelectModule, MatCheckboxModule, BrowserAnimationsModule],
  exports: [MatSortModule, MatPaginatorModule, MatTableModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule, MatCardModule, MatDialogModule, MatSelectModule, MatCheckboxModule],
  providers: [{provide: MatPaginatorIntl, useClass: MatPaginatorIntlUkr}]
})

export class MainMaterialModule {
}
