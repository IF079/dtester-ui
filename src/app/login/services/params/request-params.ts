export class RequestParams {
  uri: string;
  timeout: number;

  constructor(uri: string, timeout: number) {
    this.uri = uri;
    this.timeout = timeout;
  }
}
