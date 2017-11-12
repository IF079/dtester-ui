import {Component} from '@angular/core';
import {MatDialog, MatPaginatorIntl, PageEvent} from '@angular/material';

import {LoginService} from '../../login/services/login.service';
import {User} from '../../login/entities/user';
import {QuestionAddModalComponent} from '../test/question/question-add-modal/question-add-modal.component';
import {TestService} from '../test/test.service';
import {Test} from '../test/test';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent {
  private anonymousUserUsername = 'анонімний користувач';

  constructor(
    private loginService: LoginService,
    private testService: TestService,
    private dialog: MatDialog
  ) {
  }

  getWelcomeMessage(): string {
    console.log(this.loginService.user);
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

  parseTests(test: Test[]): any[] {
    let localArr = [];
    test.forEach(item => {
      localArr.push({
        value: item.testId,
        text: item.testName
      });
    });
    return localArr;
  }

  openQuestionAddModal(): void {
    this.testService.getTests().subscribe(testsData => {
      const dialogRef = this.dialog.open(QuestionAddModalComponent, {
        width: '400px',
        data: {
          tests: this.parseTests(testsData[0])
        }
      });

      dialogRef.afterClosed().subscribe(result => {

      });
    })
  }
}
