import { Component, OnInit } from '@angular/core';
import { GlobalService } from './services';

@Component({
    selector: 'app-root',
    template: `
    <side-nav></side-nav>
    <div class="loading" *ngIf="Global.isLoading">
      <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
    </div>
    <div class="weebContainer">
      <router-outlet></router-outlet>
    </div>`,
    styleUrls: ['app.component.scss']
})

export class AppComponent {
  constructor(private Global: GlobalService) {}
}
