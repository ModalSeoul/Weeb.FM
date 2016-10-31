import { Component, OnInit } from '@angular/core';
import { UserService, GlobalService } from '../../services';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html'
})
export class LeaderboardComponent implements OnInit {
  private topUsers: Array<any> = [];

  constructor(
    private users: UserService,
    private Global: GlobalService
  ) { }

  ngOnInit() {
    this.users.getLeaderboardUsers().subscribe((r : any) => {
      this.topUsers = r;
      this.Global.isLoading= false;
    });
  }

}
