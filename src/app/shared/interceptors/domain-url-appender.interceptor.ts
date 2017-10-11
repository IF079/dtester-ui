import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {defaultUrlConfig} from '../config/url.default.config';

@Injectable()
export class DomainUrlAppenderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
      url: defaultUrlConfig.domain + req.url
    }));
  }
}
