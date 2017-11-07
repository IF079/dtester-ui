import {NgModule} from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';

import {
  MatPaginatorModule,
  MatTableModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [MatPaginatorModule, MatTableModule, CdkTableModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule, MatCardModule, MatDialogModule],
  exports: [MatPaginatorModule, MatTableModule, CdkTableModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule, MatCardModule, MatDialogModule]
})
export class MainMaterialModule {
}
