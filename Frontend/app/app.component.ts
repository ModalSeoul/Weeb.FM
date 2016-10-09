import { Component } from '@angular/core';
// import { HTTP_PROVIDERS } from '@angular/http';
// import { HttpService } from './services/index';

@Component({
    selector: 'my-app',
    template: `
    <side-nav></side-nav>
    <div class="__weeb">
      <router-outlet></router-outlet>
    </div>`
})
export class AppComponent {
}
