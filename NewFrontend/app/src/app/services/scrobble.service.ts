import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import 'rxjs/add/operator/map';

@Injectable()
export class ScrobbleService {
  private ep: string = 'scrobbles/';

  constructor(private http: HttpService) {}

  /*This class is laid out in a fairly
  * straight forward manner. Names are
  * long, but they're explicit
  */

  public getScrobble(id: number) {
    return this.http.get(`songs/${id}`);
  }

  public getRecent(amount: string | number) {
    return this.http.get(`${this.ep}?past=${amount}`);
  }

  public getUserScrobbles(name: string, start: number, end: number) {
    return this.http.get(`${this.ep}?by_user=${name}&start=${start}&end=${end}`);
  }

  public getUserIdScrobbles(id: number) {
    return this.http.get(`${this.ep}${id}/by_user_id`);
  }

  public getArtistScrobbles(name: string) {
    return this.http.get(`${this.ep}${name}/by_artist`);
  }

  public getSongScrobbles(title: string) {
    return this.http.get(`${this.ep}${title}/by_song`);
  }

  public getAlbumScrobbles(title: string) {
    return this.http.get(`${this.ep}${title}/by_album`);
  }

  public deleteScrobble(id: number | string) {
    return this.http.delete(`${this.ep}${id}/`);
  }

  public postScrobble(song: string, artist: string) {
    return this.http.post('scrobbles', {
      'song': song,
      'artist': artist
    });
  }
}
