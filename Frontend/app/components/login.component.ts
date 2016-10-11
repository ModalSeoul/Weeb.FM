import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/index';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'login',
  template: `
  <div class="__wrapper">
    <div class="__login">
      <input class="text-wilt" type="text" [(ngModel)]="username" placeholder="Username">
      <input class="text-wilt" type="password" [(ngModel)]="password" placeholder="Password">
      <span class="__bottom">
        <input class="btn-wilt" type="button" value="Login" (click)="login()">
        <a href="#">Register</a>
      </span>
    </div>
  </div>
  `,
  styles: [`
    .__wrapper {
      padding: 5rem;
      margin: 0 auto;
      margin-top: 15%;
      width: 15rem;
    }

    .__login > input {
      margin: .25rem;
      padding: .25rem;
    }

    .__login {
      padding: 2rem;
    }

    .__bottom {
      padding: .25rem;
      display: inline;
    }

  `],
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
