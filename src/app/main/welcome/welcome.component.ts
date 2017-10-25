import {Component} from '@angular/core';

import {LoginService} from '../../login/services/login.service';
import {User} from '../../login/services/entities/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent {
  private anonymousUserUsername = 'анонімний користувач';
  constructor(private loginService: LoginService) {
  }
  getWelcomeMessage(): string {
    return this.getWelcomeMessageForUser(this.loginService.user);
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
    return 'Ласкаво просимо, ' + username + '!';
  }
}
