import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
// import { HttpService } from './services/index';

@Component({
    selector: 'home',
    template: `<h2>Home Component</h2>`,
    // providers: [HttpService],
    directives: [ROUTER_DIRECTIVES],
})
export class HomeComponent {

  // constructor(private http: HttpService) {}

}
