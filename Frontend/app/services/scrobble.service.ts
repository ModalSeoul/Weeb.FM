import { Injectable } from '@angular/core';
import { HttpService } from './index';

import 'rxjs/add/operator/map';

@Injectable()
export class ScrobbleService {

  constructor(private http: HttpService) {}

  public getUserScrobbles(name: string) {
    return this.http.get(`scrobbles/${name}/by_user`).map((r: any) => {
      return r;
    });
  }

  public getArtistScrobbles(name: string) {
    return this.http.get(`scrobbles/${name}/by_artist`).map((r: any) => {
      return r;
    });
  }

  public getSongScrobbles(title: string) {
    return this.http.get(`scrobbles/${title}/by_song`).map((r: any) => {
      return r;
    });
  }

  public getAlbumScrobbles(title: string) {
    return this.http.get(`scrobbles/${title}/by_album`).map((r: any) => {
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
