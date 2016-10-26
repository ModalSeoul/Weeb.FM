import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/index';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  private topUsers: Array<any> = [];

  constructor(
    private users: UserService,
    private app: AppComponent
  ) { }

  ngOnInit() {
    this.users.getLeaderboardUsers().subscribe((r : any) => {
      this.topUsers = r;
      this.app.loading = false;
    });
  }

}
