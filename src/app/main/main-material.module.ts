import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatCardModule, MatDialogModule],
  exports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatCardModule, MatDialogModule]
})
export class MainMaterialModule {
}
