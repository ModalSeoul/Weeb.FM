import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService, AuthService, ScrobbleService, UserService } from '../services/index';
import { ScrobbleTableComponent } from '../common/index';
import { AppComponent } from '../app.component';

@Component({
    selector: 'profile',
    template: `<h2>Profile Component</h2>
    <img style="width:64px; height:64px" [src]="avatar"> <h2>{{nick}}</h2>
    <input *ngIf="canFollow" type="button" class="btn-wilt" value="+ Follow">
    <scrobble-table [content]="scrobbles"><h1>Loading...</h1></scrobble-table>
    `,
    providers: [
      HttpService,
      ScrobbleService,
      UserService,
      AuthService
    ],
})

export class ProfileComponent implements OnInit {
  private scrobbles: Array<any> = [];
  private uid: string;
  private avatar: string = 'http://localhost:8000';
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
