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
  private newGithub: string;
  private newReddit: string;
  private newTwitter: string;
  private newBio: string;

  constructor(
    private Global: GlobalService,
    private User: UserService,
    private Auth: AuthService,
    private cookies: CookieService
  ) { }

  ngOnInit() {
    this.User.getCurrentUser().subscribe((user: any) => {
      this.token = this.Auth.getCookie();
      this.activeUser = user;
      this.Global.isLoading = false;
    });
  }

  public updateBio() {
    this.User.updateBio(
      this.User.curUser.nick_name,
      this.newGithub,
      this.newTwitter,
      this.newReddit,
      this.newBio
    ).subscribe(
      (r: any) => {
        console.log(this.newGithub, this.newReddit, this.newTwitter);
        alert('Grats!');
      }, (err) => alert('Error!'));
  }

  public setColor(color: string) {
    this.cookies.put('theme', color);
    location.reload();
  }
}
