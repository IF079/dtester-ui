import { TestDetail } from '../../../entities/test-detail';

export class TestDetailDto {
  id?: number;
  test_id: number;
  level: number;
  tasks: number;
  rate: number;

  constructor(testDetail: TestDetail) {
    this.id = testDetail.id;
    this.test_id = testDetail.testId;
    this.level = testDetail.level;
    this.tasks = testDetail.tasks;
    this.rate = testDetail.rate;
  }
}
