import {NgModule} from '@angular/core';
import {MatCardModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatInputModule],
  exports: [MatCardModule, MatInputModule]
})
export class LoginMaterialModule {
}
