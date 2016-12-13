import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, GlobalService, StatsService } from '../../services';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit {
  private artist: string;
  private users: Array<any> = [];
  private count: number;

  constructor(
    private Global: GlobalService,
    private route: ActivatedRoute,
    private User: UserService,
    private Stats: StatsService
  ) { }

  ngOnInit() {
    this.artist = this.route.snapshot.params['name'];
    this.User.listensTo(encodeURIComponent(this.artist)).subscribe((users: any) => {
      this.users = users;
      this.Stats.artistPlayCount(this.artist).subscribe((artist: any) => {
        this.count = artist['count']
        this.Global.isLoading = false;
      });
    });
  }

}
