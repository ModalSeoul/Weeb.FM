import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HttpService,
  AuthService,
  ScrobbleService,
  UserService,
  ProfileService,
  GlobalService
} from '../../services';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  private start: number = 50;
  private full: boolean = false;
  private scrobbles: Array<any> = [];
  private topArtists: Array<any> = [];
  private uid: string;
  private profileObj: any = {};
  private isFollowing: boolean;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private r: Router,
    private http: HttpService,
    private Scrobble: ScrobbleService,
    private auth: AuthService,
    private user: UserService,
    private Profile: ProfileService,
    private Global: GlobalService
  ) {
  }

  public contains(list: Array<any>, check: string | number) {
    return !!~list.indexOf(check);
  }

  public isMe(me: string) {
    if (this.uid == me) {
      return true;
    } else {
      return false;
    }
  }

  public refresh(self: boolean, id: any) {
    if (!self) {
      this.uid = this.route.snapshot.params['id'];
    } else {
      this.uid = id;
    }

    this.Profile.updateProfile(this.uid).then((r: any) => {
      console.log(r);
      this.profileObj = r;
      this.user.getTopArtists(this.uid).subscribe((artists: any) => {
        this.topArtists = artists;
        this.Global.isLoading = false;
      });
    });

    this.Scrobble.getUserScrobbles(this.uid, 0, 100).subscribe((r: any) => {
      this.scrobbles = r;
    });
  }

  public follow() {
    this.user.follow(this.uid).subscribe((r: any) => {
      console.log(r);
    });
  }

  // Adds additional scrobbles to the viewing list
  public addScrobbles() {
    this.Scrobble.getUserScrobbles(
      this.uid, this.start, this.start + 50
    ).subscribe((r: any) => {
      if (r.length < 50) {
        this.full = true;
      } else {
        this.start += 50;
      }
      r.forEach((scrobble: any) => {
        this.scrobbles.push(scrobble);
      });
    });
  }

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.paramsChanged(params['id']);
    });
    this.refresh(false, undefined);
  }

  public paramsChanged(id: any) {
    this.refresh(true, id);
  }

}
