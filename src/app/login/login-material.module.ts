import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatInputModule, MatButtonModule],
  exports: [MatCardModule, MatInputModule, MatButtonModule]
})
export class LoginMaterialModule {
}
