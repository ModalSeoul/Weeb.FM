import { Component, OnInit } from '@angular/core';
import { UserService, GlobalService, StatsService } from '../../services';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  private scrobbleCount: number | string;
  private memberCount: number | string;
  private popularSongs: Array<any> = [];
  private popularArtists: Array<any> = [];

  constructor(
    private Stats: StatsService,
    private User: UserService,
    private Global: GlobalService
  ) { }


  public refresh() {
    this.Stats.popularArtists().subscribe((artists: any) => {
      this.popularArtists = artists;
    });
    this.Stats.popularSongs().subscribe((songs: any) => {
      this.popularSongs = songs;
    });
    this.Stats.scrobbleCount().subscribe((r: any) => {
      this.scrobbleCount = r;
      this.User.getCount().subscribe((l: any) => {
        this.memberCount = l;
        this.Global.isLoading = false;
      });
    });
  }

  ngOnInit() {
    this.refresh();
  }

}
