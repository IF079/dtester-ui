import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatDialogModule],
  exports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatDialogModule]
})
export class MainMaterialModule {
}
