import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: HttpService) {}

  /*This class is laid out in a fairly
  * straight forward manner. Names are
  * long, but they're explicit
  */

  public getUserAvatar(name: string) {
    return this.http.get(`members/${name}/by_nick/`).map((r: any) => {
      return r['profile_picture'];
    });
  }

  // Deprecating this
  public getUserNick(name: string) {
    return this.http.get(`members/${name}/by_nick/`).map((r: any) => {
      return r['nick_name'];
    });
  }

  // This function will replace getUserNick next version.
  public getUserObject(name: string) {
    return this.http.get(`members/${name}/by_nick/`).map((r: any) => {
      return r;
    });
  }

  public getCurrentUser() {
    return this.http.get('members/current/').map((r: any) => {
      return r;
    });
  }

  public getCount() {
    return this.http.get('members/count/').map((r: any) => {
      return r;
    });
  }

  public follow(user: string) {
    return this.http.post(`followings/${user}/follow`).map((r: any) => {
      return r;
    });
  }

  public followers(id: string | number) {
    return this.http.get(`followings/${id}/followers`).map((r: any) => {
      return r;
    });
  }

  public listensTo(name: string) {
    return this.http.get(`members/?listened=${name}`).map((r: any) => {
      return r;
    });
  }
}
