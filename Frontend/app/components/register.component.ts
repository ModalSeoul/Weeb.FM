import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/index';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'register',
  template: `
  <div class="__wrapper">
    <div class="__register">
      <input class="text-wilt" type="text" [(ngModel)]="username" placeholder="Username">
      <input class="text-wilt" type="text" [(ngModel)]="email" placeholder="E-Mail">
      <input class="text-wilt" type="password" [(ngModel)]="password" placeholder="Password">
      <input class="text-wilt" type="password" [(ngModel)]="confPassword" placeholder="Confirm Password">
      <span class="__bottom">
        <input class="btn-wilt" type="button" value="Register" (click)="register()">
        <a [routerLink]="['/login']">Login</a>
        <span *ngIf="noMatch">Passwords do not match!</span>
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

    .__register > input {
      margin: .25rem;
      padding: .25rem;
    }

    .__register {
      padding: 2rem;
    }

    .__bottom {
      padding: .25rem;
      display: inline;
    }

  `],
  providers: [ AuthService ]
})

export class RegisterRoute implements OnInit {
  private username: string;
  private email: string;
  private password: string;
  private confPassword: string;
  private noMatch: boolean = false;

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

  public register() {
    if (this.password != this.confPassword) {
      this.noMatch = true;
    }
    if (this.password === this.confPassword && this.noMatch) {
      this.noMatch = false;
    }
  }
}
