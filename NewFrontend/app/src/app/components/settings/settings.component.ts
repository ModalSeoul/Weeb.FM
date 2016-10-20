import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private activeUser: any;
  private avatar: any;
  private token: string;

  constructor(
    private app: AppComponent,
    private User: UserService,
    private Auth: AuthService
  ) { }

  ngOnInit() {
    this.User.getCurrentUser().subscribe((user: any) => {
      this.token = this.Auth.getCookie();
      console.log(this.token);
      this.activeUser = user;
      this.app.loading = false;
    });
  }
}
