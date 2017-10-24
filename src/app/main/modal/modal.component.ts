import {Component, OnInit} from '@angular/core';
import {LoggerFactory} from '../../shared/logger/logger.factory';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  isHidden = true;

  constructor() {
    log.info('constructor()');
  }

  ngOnInit() {
    log.info('ngOnInit()');
  }

  openDialogue() {
    log.info('openDialogue()');
    this.isHidden = false;
  }

  closeDialogue() {
    log.info('closeDialogue()');
    this.isHidden = true;
  }

}

const log = LoggerFactory.create(ModalComponent);
