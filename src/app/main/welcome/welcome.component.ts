import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';

import {LoginService} from '../../login/services/login.service';
import {User} from '../../login/entities/user';
import {QuestionAddModalComponent} from '../test/question/question-add-modal/question-add-modal.component';
import {TestModalComponent} from '../test/test-modal/test-modal.component';
import {ResultAddModalComponent} from '../test/result/result-add-modal/result-add-modal.component';
import {TestService} from '../test/test.service';
import {Test} from '../test/test';
import {SubjectService} from '../subject/subject-service/subject.service';
import {Subject} from '../subject/subject-classes/subject';
import {ResultService} from '../test/result/result.service';
import {Result} from '../test/result/result';

@Component({
  selector: 'dtest-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent {
  private anonymousUserUsername = 'анонімний користувач';

  constructor(
    public loginService: LoginService,
    private testService: TestService,
    private subjectService: SubjectService,
    private resultService: ResultService,
    private dialog: MatDialog
  ) {
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

  parseTests(test: Test[]): any[] {
    const localArr = [];
    test.forEach(item => {
      localArr.push({
        value: item.testId,
        text: item.testName
      });
    });
    return localArr;
  }

  parseSubjects(subject: Subject[]): any[] {
    const localArr = [];
    subject.forEach(item => {
      localArr.push({
        value: item.id,
        text: item.name
      });
    });
    return localArr;
  }

  parseResults(result: Result[]): any[] {
    const localArr = [];
    result.forEach(item => {
      this.resultService.getStudentAndTest(item.studentId, item.testId).subscribe(data => {
        localArr.push({
          endTime: item.endTime.substring(0, item.endTime.length - 3),
          studentName: `${data[0][0].studentName} ${data[0][0].studentSurname}`,
          testName: data[1][0].testName,
          result: item.result
        });
      });
    });
    return localArr;
  }

  openTestModal(type: string): void {
    this.subjectService.getSubjects().subscribe(subjectsData => {
      const dialogRef = this.dialog.open(TestModalComponent, {
        width: '400px',
        data: {
          subjects: this.parseSubjects(subjectsData[0]),
          type: type
        }
      });

      dialogRef.afterClosed().subscribe(result => {

      });
    });
  }

  openResultAddModal(): void {
    this.resultService.getResults().subscribe(resultsData => {
      const dialogRef = this.dialog.open(ResultAddModalComponent, {
        width: '500px',
        data: {
          results: this.parseResults(resultsData[0])
        }
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    });
  }

}

