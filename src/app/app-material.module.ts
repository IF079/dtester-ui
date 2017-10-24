import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule],
  exports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule]
})
export class AppMaterialModule {
}
