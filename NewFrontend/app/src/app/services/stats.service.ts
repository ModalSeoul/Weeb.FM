import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import 'rxjs/add/operator/cache';


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

  public artistPlayCount(artist: string) {
    const network$ = this.http.get(`artists/count/?artist=${artist}`).cache();
    network$.subscribe();
    return network$;
  }

}
