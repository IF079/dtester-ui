import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatDialogModule, MatSelectModule],
  exports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatDialogModule, MatSelectModule]
})
export class MainMaterialModule {
}
