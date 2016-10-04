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

  public getArtistScrobbles(name: string | number) {
    return this.http.get(`scrobbles/${name}/by_artist`).map((r: any) => {
      return r;
    });
  }
}
