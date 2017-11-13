import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';

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
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [MatSortModule, MatPaginatorModule, MatTableModule, CdkTableModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule, MatCardModule, MatDialogModule, MatSelectModule, MatCheckboxModule],
  exports: [MatSortModule, MatPaginatorModule, MatTableModule, CdkTableModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule, MatCardModule, MatDialogModule, MatSelectModule, MatCheckboxModule]
})

export class MainMaterialModule {
}
