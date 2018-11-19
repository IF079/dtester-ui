import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';

import {InfoModalService} from '../../info-modal/info-modal.service';

@Injectable()
export class ResponseHandlerInterceptor implements HttpInterceptor {
  constructor(
    private modal: InfoModalService,
    private location: Location
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(res => {
      if (res instanceof HttpResponse) {
        if (res.body.response === 'no records') { // IF BAD RESPONSE...
          this.modal.openErrorDialog('Вибачте, дані відсутні.', () => {
            this.location.back();
          });
        } else if (res.body.response && res.body.response.indexOf('error') !== -1) {
          if (res.url.indexOf('/get') !== -1) {
            this.modal.openErrorDialog('Помилка при запиті на сервер. Cпробуйте, будь ласка, пізніше.');
          } else if (res.url.indexOf('/insertData') !== -1 || res.url.indexOf('/update') !== -1) {
            this.modal.openErrorDialog('Помилка при відпраці даних на сервер. Cпробуйте, будь ласка, пізніше.');
          }
        } else if (res.url.indexOf('/insertData') !== -1 && res.body.response === 'ok') { // IF GOOD RESPONSE...
          this.modal.openSuccessDialog('Запис успішно добавлено!');
        } else if (res.url.indexOf('/update') !== -1) {
          this.modal.openSuccessDialog('Зміни успішно збережені!');
        }
      }
    });
  }
}
