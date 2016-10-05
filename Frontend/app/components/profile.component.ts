import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService, ScrobbleService, UserService } from '../services/index';
import { ScrobbleTableComponent } from '../common/index';

@Component({
    selector: 'profile',
    template: `<h2>Profile Component</h2>
    <img style="width:64px; height:64px" [src]="avatar"> <h2>{{nick}}</h2>
    <scrobble-table [content]="scrobbles"></scrobble-table>
    `,
    providers: [
      HttpService,
      ScrobbleService,
      UserService
    ],
})

export class ProfileComponent implements OnInit {
  private scrobbles: Array<any> = [];
  private uid: string;
  private avatar: string = 'http://localhost:8000';
  private nick: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private Scrobble: ScrobbleService,
    private User: UserService
  ) {}

  public ngOnInit() {
    this.uid = this.route.snapshot.params['id'];

    // this.Scrobble.postScrobble('The Trooper', 'Iron Maiden').subscribe((r: any) => {
    //   console.log(r);
    // });

    this.User.getUserNick(this.uid).subscribe((r: any) => {
      this.nick = r;
    });

    this.User.getUserAvatar(this.uid).subscribe((r: any) => {
      this.avatar += r;
    });

    this.Scrobble.getUserScrobbles(this.uid).subscribe((r: any) => {
      this.scrobbles = r;
      console.log(r);
    });
  }

}
