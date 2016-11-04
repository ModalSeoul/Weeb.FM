import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/cache';

@Injectable()
export class UserService {
  public curUser: any = {};

  constructor(private http: HttpService) {
    this.getCurrentUser().subscribe((r: any) => {
      this.curUser = r;
    });
  }

  /*This class is laid out in a fairly
  * straight forward manner. Names are
  * long, but they're explicit
  */

  public getUserObject(name: string) {
    const network$ = this.http.get(`members/${name}/by_nick/`).cache();
    network$.subscribe(
      () => console.log('(User object)HTTP Get happened!'));
    return network$;
  }

  public getTopArtists(name: string) {
    const network$ = this.http.get(`members/${name}/top/`).cache();
    network$.subscribe();
    return network$;
  }

  public getLeaderboardUsers() {
    const network$ = this.http.get(
        'members/most_scrobbles/', {'leaderboard': true}).cache();
    network$.subscribe(
      () => console.log('(Leaderboard object)HTTP Get happened!'));
    return network$;
  }

  public getCurrentUser() {
    const network$ = this.http.get('members/current/').cache();
    network$.subscribe(
      () => console.log('(Current user)HTTP Get happened!'));
    return network$;
  }

  public getCount() {
    return this.http.get('members/count/').share();
  }

  public follow(user: string) {
    return this.http.post(`followings/${user}/follow`).share();
  }

  public followers(id: string | number) {
    const network$ = this.http.get(`followings/${id}/followers`).cache();
    network$.subscribe(
      () => console.log('(Followers object)Http get happened!'));
    return network$;
  }

  public getBio(nick: string) {
    const network$ = this.http.get(`member_info/${nick}/nick/`).cache();
    network$.subscribe(
      () => console.log('(Bio)Http get happened!'));
    return network$;
  }

  public updateBio(
    nick: string,
    github: string,
    twitter: string,
    reddit: string
  ) {
    const network$ = this.http.patch(`member_info/${nick}/nick/`,
      {github, twitter, reddit}).cache();
    network$.subscribe(
      () => console.log('(Bio)Http put happened!'));
    return network$;
  }

  public listensTo(name: string) {
    return this.http.get(`members/?listened=${name}`).share();
  }
}
