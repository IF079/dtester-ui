import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LoginModule} from './login/login.module';
import {DomainUrlAppenderInterceptor} from './shared/interceptors/domain-url-appender.interceptor';
import {BasicErrorHandler} from './shared/basic-error-handler';
import {MainModule} from './main/main.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    LoginModule,
    MainModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: DomainUrlAppenderInterceptor, multi: true},
    {provide: ErrorHandler, useClass: BasicErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
