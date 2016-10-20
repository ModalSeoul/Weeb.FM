import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService, AuthService, ScrobbleService, UserService } from '../../services/index';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  private start: number = 100;
  private full: boolean = false;
  private scrobbles: Array<any> = [];
  private uid: string;
  private avatarBase: string = 'https://modal.moe/cdn';
  private avatar: string;
  private nick: string;
  private userObj: any = {};
  private canFollow: boolean = false;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private r: Router,
    private http: HttpService,
    private Scrobble: ScrobbleService,
    private auth: AuthService,
    private user: UserService,
    private app: AppComponent
  ) {
  }

  public refresh(self: boolean, id: any) {
    if (!self) {
      this.uid = this.route.snapshot.params['id'];
    } else {
      this.uid = id;
    }
    this.user.getCurrentUser().subscribe((r: any) => {
      // if the user isn't viewing their own profile, display follow button
      if (this.uid != r.nick_name) {
        this.canFollow = true;
      }
    });


    // Deprecation warning (10/15/2016)
    this.user.getUserNick(this.uid).subscribe((r: any) => {
      this.nick = r;
    });

    this.user.getUserObject(this.uid).subscribe((r: any) => {
      this.userObj = r;
    });

    this.user.getUserAvatar(this.uid).subscribe((r: any) => {
      this.avatar = this.avatarBase + r;
    });

    this.Scrobble.getUserScrobbles(this.uid, 0, 100).subscribe((r: any) => {
      this.scrobbles = r;
      this.app.loading = false;
    });
  }

  // Adds additional scrobbles to the viewing list
  public addScrobbles() {
    this.Scrobble.getUserScrobbles(
      this.uid, this.start, this.start + 100
    ).subscribe((r: any) => {
      if (r.length < 100) {
        this.full = true;
      }
      r.forEach((scrobble: any) => {
        this.scrobbles.push(scrobble);
      });
      // this.scrobbles.concat(r);
    });
  }

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.paramsChanged(params['id']);
    });
    this.refresh(false, undefined);
  }

  public paramsChanged(id: any) {
    console.log(id);
    this.refresh(true, id);
  }

}
