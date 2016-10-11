import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/index';
import { UserService } from '../services/index';
import { AppComponent } from '../app.component';

@Component({
    selector: 'home',
    template: `
    <span *ngIf="loggedIn">
      <h2>Welcome back, {{curUser.nick_name}}</h2>
      <span class="__subtext">
        <h3>Here's what you missed</h3>
      </span>
    </span>

    <!-- If user is not logged in -->
    <span *ngIf="!loggedIn">
      <login></login>
    </span>
      `,
      styles: [`
        .__subtext {
          color: #aaa;
        }
    `],
    providers: [ AuthService, UserService ]
})
export class HomeComponent implements OnInit {
  private curUser: any = {};
  private loggedIn: boolean = false;

  constructor(
    private auth: AuthService,
    private user: UserService,
    private app: AppComponent
  ) {
    console.log(this.auth.isLoggedIn());
    // Setting loggedIn property based on user status
    if (this.auth.isLoggedIn()) {
      this.loggedIn = true;
      console.log(this.loggedIn);
    }
  }

  public ngOnInit() {
    this.user.getCurrentUser().subscribe((r: any) => {
      this.curUser = r[0];
      this.app.loading = false;
    });
  }

}
