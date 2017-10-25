import {Component} from '@angular/core';
import {SpinnerService} from './shared/services/spinner.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  constructor(public spinner: SpinnerService) {
  }
}
