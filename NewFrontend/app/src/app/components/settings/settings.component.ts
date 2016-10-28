import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
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
    private cookies: CookieService,
    private theme: ThemeService
  ) { }

  ngOnInit() {
    this.User.getCurrentUser().subscribe((user: any) => {
      this.token = this.Auth.getCookie();
      console.log(this.token);
      this.activeUser = user;
      this.app.loading = false;
    });
  }

  toggleTheme() {
    if (this.cookies.get('theme') === 'light') {
      this.cookies.put('theme', 'dark');
    } else {
      this.cookies.put('theme', 'light');
    }
    this.theme.setStyle(this.cookies.get('theme'));
  }
}
