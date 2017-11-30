import {TestDto} from './test-dto';

export class Test {
  testId?: number;
  testName: string;
  subjectId: number;
  tasks: number;
  timeForTest: string;
  enabled: string;
  attempts: string;

  constructor(testDto: TestDto) {
    this.testId = testDto.test_id;
    this.testName = testDto.test_name;
    this.subjectId = testDto.subject_id;
    this.tasks = testDto.tasks;
    this.timeForTest = testDto.time_for_test;
    this.enabled = testDto.enabled;
    this.attempts = testDto.attempts;
  }
}
