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
  private bio: any = {};
  private start: number = 50;
  private full: boolean = false;
  private scrobbles: Array<any> = [];
  private topArtists: Array<any> = [];
  private uid: string;
  private profileObj: any = {};
  private isFollowing: boolean;
  private sub: any;
  private viewingLoved: boolean = false;
  private viewingSelf: boolean = true;

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

  public rmScrobble(id: number | string) {
    this.Scrobble.deleteScrobble(id);
  }

  public checkSelf(self, id): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!self) {
        this.uid = this.route.snapshot.params['id'];
        resolve(this.uid);
      } else {
        this.uid = id;
        resolve(id);
      }
    });
  }

  public refresh(self: boolean, id: any) {
    this.checkSelf(self, id).then((change_this: any) => {
      // if (this.user.curUser.nick_name.toLowerCase() == id.toLowerCase()) {
      //   this.viewingSelf = true;
      // }

      this.user.getBio(this.uid).subscribe((bio: any) => {
        this.bio = bio;
      });

      this.Profile.updateProfile(this.uid).then((r: any) => {
        this.profileObj = r;
        this.user.getLoved(this.uid).subscribe((loved: any) => {
          this.profileObj.loved = loved;
          console.log(this.profileObj);
        });
        this.user.getTopArtists(this.uid).subscribe((artists: any) => {
          this.topArtists = artists;
        });
      });

      this.Scrobble.getUserScrobbles(this.uid, 0, 50).subscribe((r: any) => {
        this.scrobbles = r;
        console.log(r);
        this.Global.isLoading = false;
      });
    });
  }

  public follow() {
    this.user.follow(this.uid).subscribe((r: any) => {
      // TODO: Finish following implementation on frontend
    });
  }

  // Adds additional scrobbles to the viewing list
  public addScrobbles() {
    this.Scrobble.getUserScrobbles(
      this.uid, this.start, this.start + 25
    ).subscribe((r: any) => {
      if (r.length < 25) {
        this.full = true;
      } else {
        this.start += 25;
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
