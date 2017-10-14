import {NgModule} from '@angular/core';
import {MatButtonModule, MatToolbarModule, MatFormFieldModule} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule],
  exports: [MatToolbarModule, MatButtonModule, MatFormFieldModule]
})
export class AppMaterialModule {
}
