import { Injectable } from '@angular/core';
import { HttpService } from './index';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: HttpService) {}

  /*This class is laid out in a fairly
  * straight forward manner. Names are
  * long, but they're explicit
  */

  public getUserAvatar(name: string) {
    return this.http.get(`members/${name}/by_nick`).map((r: any) => {
      return r['profile_picture'];
    });
  }

  public getUserNick(name: string) {
    return this.http.get(`members/${name}/by_nick`).map((r: any) => {
      return r['nick_name'];
    });
  }

  public getCurrentUser() {
    return this.http.get('members/?self/').map((r: any) => {
      return r;
    });
  }
}
