import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from './services';

@Component({
    selector: 'app-root',
    template: `
    <div [class]="chosenTheme">
    <side-nav></side-nav>
      <div class="weebContainer">
        <div class="loading" *ngIf="Global.isLoading">
        <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        </div>
        <router-outlet></router-outlet>
      </div>
    </div>`,
})

export class AppComponent {
  public chosenTheme = 'theme-blue';
  constructor(private Global: GlobalService, private cookies: CookieService) {
    this.chosenTheme = `theme-${this.cookies.get('theme')}`;
    console.log(this.chosenTheme);
  }
}
