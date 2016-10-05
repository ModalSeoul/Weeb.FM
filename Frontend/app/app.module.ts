import { NgModule }      from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders} from './app.routes';
import { AppComponent } from './app.component';
import { ScrobbleTableComponent } from './common/index';
import {
  ProfileComponent,
  HomeComponent,
  LoginRoute
} from './components/index';
import {
  HttpService
} from './services/index';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    ScrobbleTableComponent,
    LoginRoute
  ],
  bootstrap: [ AppComponent ],
  providers: [ appRoutingProviders, HttpService, CookieService ]
})
export class AppModule { }
