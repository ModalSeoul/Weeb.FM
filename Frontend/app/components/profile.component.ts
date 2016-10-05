import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService, ScrobbleService } from '../services/index';

@Component({
    selector: 'profile',
    template: `<h2>Profile Component</h2>

    <table>
      <thead>
        <tr>
          <th>Song</th>
          <th>Artist</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let scrobble of scrobbles">
          <td>{{scrobble.song.title}}</td>
          <td>{{scrobble.song.artist_name}}</td>
          <td>{{scrobble.date_scrobbled}}</td>
        </tr>
      </tbody>
    </table>
    `,
    providers: [
      HttpService,
      ScrobbleService
    ],
})

export class ProfileComponent implements OnInit {
  private scrobbles: Array<any> = [];
  private uid: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private Scrobble: ScrobbleService
  ) {}

  public ngOnInit() {
    this.uid = this.route.snapshot.params['id'];
    this.loadRelations();
  }

  private loadRelations() {
    this.Scrobble.getUserIdScrobbles(this.uid).subscribe((r: any) => {
      r.forEach((scrobble: any) => {
        this.Scrobble.getScrobble(scrobble.song).subscribe((song: any) => {
          scrobble['song'] = song;
          this.scrobbles.push(scrobble);
          console.log(scrobble);
        });
      });
    });
  }

}
