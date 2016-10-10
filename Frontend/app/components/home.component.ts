import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/index';
import { UserService } from '../services/index';
import { AppComponent } from '../app.component';

@Component({
    selector: 'home',
    template: `
      <h2>Welcome back, {{curUser.nick_name}}</h2>
      <span class="__subtext">
        <h3>Here's what you missed</h3>
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

  constructor(
    private auth: AuthService,
    private user: UserService,
    private app: AppComponent
  ) {
    console.log(this.auth.isLoggedIn());
  }

  public ngOnInit() {
    this.user.getCurrentUser().subscribe((r: any) => {
      this.curUser = r[0];
      this.app.loading = false;
    });
  }

}
