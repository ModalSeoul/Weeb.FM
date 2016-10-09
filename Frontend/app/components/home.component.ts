import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/index';

@Component({
    selector: 'home',
    template: ``,
    providers: [ AuthService ]
})
export class HomeComponent {

  constructor(private auth: AuthService) {
    console.log(this.auth.isLoggedIn());
  }
}
