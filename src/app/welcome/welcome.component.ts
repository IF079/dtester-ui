import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from '../login/services/login.service';
import {User} from '../login/services/entities/user';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  private anonymousUserUsername = 'Anonym';

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  getWelcomeMessage(): string {
    return this.getWelcomeMessageForUser(this.loginService.user);
  }

  openDialogue(): void {
    this.modal.openDialogue();
  }

  private getWelcomeMessageForUser(user: User): string {
    let welcomeMessage;
    if (user && user.isLogged()) {
      welcomeMessage = this.applyWelcomeTemplate(user.username);
    } else {
      welcomeMessage = this.applyWelcomeTemplate(this.anonymousUserUsername);
    }
    return welcomeMessage;
  }

  private applyWelcomeTemplate(username: string) {
    return 'Welcome, ' + username + '!';
  }

}
