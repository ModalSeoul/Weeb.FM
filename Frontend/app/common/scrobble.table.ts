import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/index';

@Component({
    selector: 'scrobble-table',
    template: `
    <div class="table-container">
      <table class="striped">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let scrobble of content">
            <td>{{scrobble.song_name}}</td>
            <td>{{scrobble.artist_name}}</td>
            <td>{{scrobble.date_scrobbled}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    `,
    providers: [
      HttpService,
    ],
})

export class ScrobbleTableComponent {
  @Input() content: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) {}


}
