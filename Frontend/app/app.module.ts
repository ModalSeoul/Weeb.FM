import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { routing, appRoutingProviders} from './app.routes';
import { AppComponent } from './app.component';
import {
  ScrobbleTableComponent,
  SideComponent
} from './common/index';
import {
  HttpModule,
  Headers,
  BaseRequestOptions,
  XSRFStrategy,
  CookieXSRFStrategy,
  RequestOptions
} from '@angular/http';
import {
  ProfileComponent,
  HomeComponent,
  LoginRoute
} from './components/index';
import {
  HttpService
} from './services/index';


@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions{
    headers:Headers = new Headers({
        'Content-Type': 'application/json'
    });
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    SideComponent,
    ProfileComponent,
    HomeComponent,
    ScrobbleTableComponent,
    LoginRoute
  ],
  bootstrap: [ AppComponent ],
  providers: [
    appRoutingProviders,
    HttpService,
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
  ]
})
export class AppModule { }
