import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/index';

@Component({
    selector: 'side-nav',
    template: `
    <div class="__pane">
      <ul>
        <h2>Weeb</h2>
        <li [routerLink]="['/']">Home</li>
        <li *ngIf="auth.isLoggedIn()" [routerLink]="['profile/Carter']">My Profile</li>
        <li *ngIf="!auth.isLoggedIn()" [routerLink]="['login']">Login</li>
        <li>Scrobble Leaderboard</li>
      </ul>
    </div>
    `,
    styles: [`
      .__pane {
        font-family: Raleway !important;
        height: 100% !important;
        margin-bottom: -101%;
        padding-bottom: 101%;
        position: absolute;
        width: 12rem;
        bottom: 0;
        color: white;
        background-color: #6494AA;
      }
      h2 {
        color: inherit;
        padding-left: 1rem;
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
    `],
    providers: [ AuthService ]
})
export class SideComponent {

  constructor(private auth: AuthService) {}

}
