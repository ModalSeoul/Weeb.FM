import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats.service';
import { AppComponent } from '../../app.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  private scrobbleCount: number | string;
  private memberCount: number | string;

  constructor(
    private Stats: StatsService,
    private User: UserService,
    private app: AppComponent
  ) { }

  public refresh() {
    this.Stats.scrobbleCount().subscribe((r: any) => {
      this.scrobbleCount = r;
      this.User.getCount().subscribe((l: any) => {
        this.memberCount = l;
        this.app.loading = false;
      });
    });
  }

  ngOnInit() {
    this.refresh();
  }

}
