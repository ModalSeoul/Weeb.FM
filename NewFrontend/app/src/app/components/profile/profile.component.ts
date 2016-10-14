import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService, AuthService, ScrobbleService, UserService } from '../../services/index';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  private scrobbles: Array<any> = [];
  private uid: string;
  private avatar: string = 'https://modal.moe';
  private nick: string;
  private canFollow: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private Scrobble: ScrobbleService,
    private auth: AuthService,
    private user: UserService,
    private app: AppComponent
  ) {
  }

  public ngOnInit() {
    this.uid = this.route.snapshot.params['id'];
    this.user.getCurrentUser().subscribe((r: any) => {
      // if the user isn't viewing their own profile, display follow button
      if (this.uid != r.nick_name) {
        this.canFollow = true;
      }
    });

    this.user.getUserNick(this.uid).subscribe((r: any) => {
      this.nick = r;
    });

    this.user.getUserAvatar(this.uid).subscribe((r: any) => {
      this.avatar += r;
    });

    this.Scrobble.getUserScrobbles(this.uid).subscribe((r: any) => {
      this.scrobbles = r;
      this.app.loading = false;
    });
  }

}
