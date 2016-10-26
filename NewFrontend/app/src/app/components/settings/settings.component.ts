import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

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
    private app: AppComponent,
    private User: UserService,
    private Auth: AuthService,
    private cookies: CookieService
  ) { }

  ngOnInit() {
    this.User.getCurrentUser().subscribe((user: any) => {
      this.token = this.Auth.getCookie();
      console.log(this.token);
      this.activeUser = user;
      this.app.loading = false;
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
