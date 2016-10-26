import { Component, OnInit } from '@angular/core';
import { ScrobbleService, UserService } from '../../services/index';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  private scrobbles: Array<any> = [];
  private topUsers: Array<any> = [];

  constructor(
    // private Scrobbles: ScrobbleService,
    private users: UserService,
    private app: AppComponent
  ) { }

  ngOnInit() {
    this.users.getLeaderboardUsers().subscribe((r : any) => {
      this.topUsers = r;
      console.log(this.topUsers);
      this.app.loading = false;
    });

    // this.Scrobbles.getRecent(50).subscribe((r: any) => {
    //   this.scrobbles = r;
    //   this.app.loading =  false;
    // });
  }

}
