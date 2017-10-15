import {NgModule} from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  exports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule]
})
export class AppMaterialModule {
}
