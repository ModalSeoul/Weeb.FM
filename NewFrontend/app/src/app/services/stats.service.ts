import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class StatsService {

  constructor(private http: HttpService) { }

  public scrobbleCount() {
    return this.http.get('scrobbles/count').map((r: any) => {
      return r;
    });
  }

  public popularArtists() {
    return this.http.get('artists/popular').map((r: any) => {
      return r;
    });
  }

  public popularSongs() {
    return this.http.get('songs/popular').map((r: any) => {
      return r;
    });
  }

}
