import {Component} from '@angular/core';

import {LoginService} from '../../login/services/login.service';
import {WelcomeService} from './welcome.service';
import {User} from '../../login/entities/user';

@Component({
  selector: 'dtest-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent {
  pre = '/admin-area/';
  titles = ['Факультети', 'Спеціальності', 'Групи', 'Предмети', 'Розклад', 'Адміністратори'];
  links = [`${this.pre}faculties`, `${this.pre}specialities`, `${this.pre}groups`,
            `${this.pre}subjects`, `${this.pre}timetable`, `${this.pre}admins`];
  objects = [];
  private anonymousUserUsername = 'анонімний користувач';

  constructor(
    public loginService: LoginService,
    private welcomeService: WelcomeService
  ) {
    welcomeService.getAllEntitiesCount().subscribe(counts => {
      let i = 0;
      counts.forEach(count => {
        this.objects.push({
          name: this.titles[i],
          count: +count.numberOfRecords,
          link: this.links[i]
        });
        i++;
      });
    });
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

