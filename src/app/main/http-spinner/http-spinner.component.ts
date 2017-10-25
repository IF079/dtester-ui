import {Component} from '@angular/core';

import {SpinnerService} from '../shared/services/spinner.service';

@Component({
  selector: 'app-http-spinner',
  templateUrl: './http-spinner.component.html',
  styles: []
})
export class HttpSpinnerComponent {
  constructor(public spinner: SpinnerService) {
  }
}
