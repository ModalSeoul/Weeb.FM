import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/index';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'login',
  template: `
  <input type="text" [(ngModel)]="username" placeholder="Username">
  <input type="password" [(ngModel)]="password" placeholder="Password">
  <input type="button" value="Login" (click)="login()">
  `,
  providers: [ AuthService ]
})

export class LoginRoute implements OnInit {
  private username: string;
  private password: string;

  constructor(
    private auth: AuthService,
    private app: AppComponent,
    private router: Router
  ){
    // If user logged in, route to index
    if (auth.isLoggedIn()) {
      router.navigate(['/']);
    }
  }

  public ngOnInit() {
      this.app.loading = false;
  }

  public login() {
    console.log(this.username, this.password);
    // this.auth.login(this.username, this.password)
    //   .subscribe(() => this.router.navigate(['/']));

    // Use window.location instead of router to reload state
    this.auth.login(this.username, this.password)
      .subscribe(() => window.location.href = '/');
  }

  public resetPassword() {
    this.auth.resetPassword(this.username)
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
