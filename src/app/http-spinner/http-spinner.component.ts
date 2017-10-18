import {Component, OnInit} from '@angular/core';
import {SpinnerTasksTrackerService} from '../shared/services/spinner.service';

@Component({
  selector: 'app-http-spinner',
  templateUrl: './http-spinner.component.html',
  styleUrls: ['./http-spinner.component.scss']
})
export class HttpSpinnerComponent implements OnInit {

  constructor(public spinner: SpinnerTasksTrackerService) { }

  ngOnInit() {
  }

}
