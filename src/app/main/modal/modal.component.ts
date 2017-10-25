import {Component} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  isHidden = true;
  constructor() {
  }

  openDialogue() {
    this.isHidden = false;
  }

  closeDialogue() {
    this.isHidden = true;
  }
}
