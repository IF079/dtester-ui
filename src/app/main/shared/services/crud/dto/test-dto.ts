import {Test} from '../../../entities/test';

export class TestDto {
  test_id?: number;
  test_name: string;
  subject_id: number;
  tasks: number;
  time_for_test: string;
  enabled: string;
  attempts: string;

  constructor(test: Test) {
    this.test_id = test.testId;
    this.test_name = test.testName;
    this.subject_id = test.subjectId;
    this.tasks = test.tasks;
    this.time_for_test = test.timeForTest;
    this.enabled = test.enabled;
    this.attempts = test.attempts;
  }
}
