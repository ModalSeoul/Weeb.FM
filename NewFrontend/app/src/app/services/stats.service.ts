import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class StatsService {

  constructor(private http: HttpService) { }

  public scrobbleCount() {
    return this.http.get('scrobbles/count');
  }

  public popularArtists() {
    return this.http.get('artists/popular');
  }

  public popularSongs() {
    return this.http.get('songs/popular');
  }

}
