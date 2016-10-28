import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UserService, AuthService, GlobalService } from '../../services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private activeUser: any;
  private avatar: any;
  private token: string;

  private primaryChoices: any;

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
    this.primaryChoices = [
      'gray',
      'red',
      'pink',
      'grape',
      'violet',
      'indigo',
      'blue',
      'cyan',
      'teal',
      'green',
      'lime',
      'yellow',
      'orange'
    ];
  }

  setPrimaryColor(color) {
    this.cookies.putObject('primary-color', color);
  }
}
