import { Component, OnInit } from '@angular/core';
import { ScrobbleService } from '../../services/index';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  private scrobbles: Array<any> = [];

  constructor(
    private Scrobbles: ScrobbleService,
    private app: AppComponent
  ) { }

  ngOnInit() {
    this.Scrobbles.getRecent(50).subscribe((r: any) => {
      this.scrobbles = r;
      this.app.loading =  false;
    });
  }

}
