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
import {
  AuthService,
  UserService,
  HttpService,
  ScrobbleService,
  StatsService
} from './services';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ScrobbletableComponent } from './components/scrobbletable/scrobbletable.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { RecentComponent } from './components/recent/recent.component';
import { StatsComponent } from './components/stats/stats.component';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
    headers:Headers = new Headers({
        'Content-Type': 'application/json'
    });
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    ProfileComponent,
    RegisterComponent,
    HomeComponent,
    ScrobbletableComponent,
    LeaderboardComponent,
    RecentComponent,
    StatsComponent,
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
