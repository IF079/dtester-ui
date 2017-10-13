import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  exports: [MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule]
})
export class LoginMaterialModule {
}
