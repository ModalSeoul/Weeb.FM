import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UserService, AuthService, GlobalService } from '../../services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  private activeUser: any;
  private avatar: any;
  private token: string;

  constructor(
    private Global: GlobalService,
    private User: UserService,
    private Auth: AuthService,
    private cookies: CookieService
  ) { }

  ngOnInit() {
    this.User.getCurrentUser().subscribe((user: any) => {
      this.token = this.Auth.getCookie();
      console.log(this.token);
      this.activeUser = user;
      this.Global.isLoading = false;
    });
  }
}
