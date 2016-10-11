import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from '../services/index';

@Component({
    selector: 'side-nav',
    template: `
    <div class="__pane">
      <ul>
        <h2>What I Listen To</h2>
        <hr class="__sep">
        <li [routerLink]="['/']">Home</li>
        <li *ngIf="auth.isLoggedIn()" [routerLink]="['profile/', curUser]">My Profile</li>
        <li *ngIf="!auth.isLoggedIn()" [routerLink]="['login']">Login</li>
        <li>Scrobble Leaderboard</li>
      </ul>
    </div>
    `,
    styles: [`
      .__pane {
        height: 100% !important;
        position: fixed;
        width: 12rem;
        bottom: 0;
        color: white;
        background-color: #6494AA;
      }
      h2 {
        color: inherit;
        text-align: center;
        font-family: Pacifico;
      }
      ul {
        display: inline;
        list-style: none;
      }
      li {
        padding-left: 1rem;
        background-color: #41606E;
        padding: 1rem;
        border-bottom: #6494AA;
        margin-bottom: .2rem;
        cursor: pointer;
        transition: 1s;
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer */
        -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
        -webkit-user-select: none; /* Chrome, Safari, and Opera */
        -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
      }
      li:hover {
        background-color: #324954;
      }
      .__sep {
        background-color: white;
        height: 2px;
        border: none;
        width: 75%;
        padding: 0;
        margin-top: -1.5em;
      }
    `],
    providers: [ AuthService, UserService ]
})
export class SideComponent {
  public curUser: string;

  constructor(
    private auth: AuthService,
    private user: UserService,
    private router: Router
  ) {
    user.getCurrentUser().subscribe((r: any) => {
      this.curUser = r.nick_name;
    });
  }

}
