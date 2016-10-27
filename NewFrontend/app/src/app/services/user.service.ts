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
    return this.http.get(`members/${name}/by_nick/`);
  }

  // Deprecating this
  public getUserNick(name: string) {
    return this.http.get(`members/${name}/by_nick/`);
  }

  // This function will replace getUserNick next version.
  public getUserObject(name: string) {
    return this.http.get(`members/${name}/by_nick/`);
  }

  public getLeaderboardUsers() {
    return this.http.get('members/most_scrobbles/', { 'leaderboard': true });
  }

  public getCurrentUser() {
    return this.http.get('members/current/');
  }

  public getCount() {
    return this.http.get('members/count/');
  }

  public follow(user: string) {
    return this.http.post(`followings/${user}/follow`);
  }

  public followers(id: string | number) {
    return this.http.get(`followings/${id}/followers`);
  }

  public listensTo(name: string) {
    return this.http.get(`members/?listened=${name}`);
  }
}
