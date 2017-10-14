import {NgModule} from '@angular/core';
import {MatButtonModule, MatToolbarModule, MatTableModule} from '@angular/material';
@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatTableModule],
  exports: [MatToolbarModule, MatButtonModule, MatTableModule]
})
export class AppMaterialModule {
}
