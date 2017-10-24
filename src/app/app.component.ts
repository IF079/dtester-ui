import {Component} from '@angular/core';
import {LoggerFactory} from './shared/logger/logger.factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    log.info('created');
  }
}

const log = LoggerFactory.create(AppComponent);
