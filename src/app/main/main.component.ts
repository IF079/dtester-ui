import {Component} from '@angular/core';
import {SpinnerService} from './spinner/spinner.service';

@Component({
  selector: 'dtest-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  constructor(public spinner: SpinnerService) {
  }
}
