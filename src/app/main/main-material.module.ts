import {NgModule} from '@angular/core';
import {
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
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule, MatCardModule, MatDialogModule, MatTableModule],
  exports: [MatToolbarModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule, MatCardModule, MatDialogModule, MatTableModule]
})
export class MainMaterialModule {
}
