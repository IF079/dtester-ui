import {NgModule} from '@angular/core';
import {MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatCardModule, MatPaginatorModule} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatPaginatorModule],
  exports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatPaginatorModule]
})
export class AppMaterialModule {
}
