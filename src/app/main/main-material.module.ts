import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatDialogModule],
  exports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatDialogModule]
})
export class MainMaterialModule {
}
