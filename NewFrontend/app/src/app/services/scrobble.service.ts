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
    return this.http.get(`songs/${id}`).map((r: any) => {
      return r;
    });
  }

  public getRecent(amount: string | number) {
    return this.http.get(`${this.ep}?past=${amount}`).map((r: any) => {
      return r;
    });
  }

  public getUserScrobbles(name: string, start: number, end: number) {
    return this.http.get(`${this.ep}?by_user=${name}&start=${start}&end=${end}`).map((r: any) => {
      return r;
    });
  }

  public getUserIdScrobbles(id: number) {
    return this.http.get(`${this.ep}${id}/by_user_id`).map((r: any) => {
      return r;
    });
  }

  public getArtistScrobbles(name: string) {
    return this.http.get(`${this.ep}${name}/by_artist`).map((r: any) => {
      return r;
    });
  }

  public getSongScrobbles(title: string) {
    return this.http.get(`${this.ep}${title}/by_song`).map((r: any) => {
      return r;
    });
  }

  public getAlbumScrobbles(title: string) {
    return this.http.get(`${this.ep}${title}/by_album`).map((r: any) => {
      return r;
    });
  }

  public postScrobble(song: string, artist: string) {
    return this.http.post('scrobbles', {
      'song': song,
      'artist': artist
    }).map((r: any) => {
      return r;
    });
  }
}
