import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {DEFAULT_URL_CONFIG} from '../config/url.default.config';

@Injectable()
export class DomainUrlAppenderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
      url: DEFAULT_URL_CONFIG.domain + req.url
    }));
  }
}
