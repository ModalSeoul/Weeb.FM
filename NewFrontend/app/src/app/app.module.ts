import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import {
  HttpModule,
  Headers,
  BaseRequestOptions,
  XSRFStrategy,
  CookieXSRFStrategy,
  RequestOptions
} from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AppComponent } from './app.component';
import {
  AuthService,
  UserService,
  HttpService,
  ScrobbleService,
  StatsService,
  BlogService,
  ProfileService,
  GlobalService
} from './services';

import * as Components from './components';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
    headers:Headers = new Headers({
        'Content-Type': 'application/json'
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ...Object.keys(Components).map(k => Components[k]),
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthService,
    UserService,
    HttpService,
    ScrobbleService,
    StatsService,
    BlogService,
    ProfileService,
    GlobalService,
    CookieService,
    {
      provide: RequestOptions,
      useClass: DefaultRequestOptions
    },
    {
        provide: XSRFStrategy,
        useFactory: (cookieService: any) => {
            return new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
        },
        deps: [CookieService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
