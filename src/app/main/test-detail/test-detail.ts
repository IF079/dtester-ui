import {TestDetailDto} from './test-detail-dto';

export class TestDetail {
  id?: number;
  testId: number;
  level: number;
  tasks: number;
  rate: number;

  constructor(testDetailDto: TestDetailDto) {
    this.id = testDetailDto.id;
    this.testId = testDetailDto.test_id;
    this.level = testDetailDto.level;
    this.tasks = testDetailDto.tasks;
    this.rate = testDetailDto.rate;
  }
}
