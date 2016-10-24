import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UserService } from './user.service';

@Injectable()
export class ProfileService {

  constructor(
    private http: HttpService,
    private User: UserService
  ) { }

  public contains(list: Array<any>, check: string | number) {
    return !!~list.indexOf(check);
  }

  public isMe(activeUser: string, visitingUser: string) {
    if (activeUser == visitingUser) {
      return true;
    } else {
      return false;
    }
  }

  public dayDiff(joinDate: any): Promise<any> {
    let today: any = new Date();
    today.setDate(today.getDate() + 1); // Solves off by 1
    return new Promise((resolve, reject) => {
      resolve(Math.floor(( Date.parse(today) - Date.parse(joinDate) ) / 86400000));
    });
  }

  // TODO: Split this up
  public canFollow(visitingUser: string) {
    return new Promise((resolve, reject) => {
      let resolveMe: any = {};
      this.User.getCurrentUser().subscribe((r: any) => {
        let tmpUser: any = r;
        // if the user isn't viewing their own profile, display follow button
        this.User.getUserObject(visitingUser).subscribe((visitingObj: any) => {
          // TODO: global var for cdn
          resolveMe.avatar = `https://modal.moe/cdn${visitingObj.profile_picture}`;
          resolveMe.banner = `https://modal.moe/cdn${visitingObj.banner_picture}`;
          resolveMe.nick = visitingObj.nick_name;
          resolveMe.listen_count = visitingObj.listen_count;
          this.dayDiff(visitingObj.date_joined).then((diffDays: any) => {
            resolveMe.per_day = Math.ceil(resolveMe.listen_count / diffDays);
          });
          this.User.followers(visitingObj.id).subscribe((r: any) => {
            resolveMe.followerCount = r.length;
            // If requesting user is in the following array
            if (this.contains(r, tmpUser.nick_name)) {
              // then the user cannot "follow" on this profile
              resolveMe.canFollow = false;
              // To not show "unfollow" for self
              if (!this.isMe(tmpUser.nick_name, visitingUser)) {
                resolveMe.isFollowing = true;
              }
            }
            if (resolveMe.canFollow != false) {
              if (!this.isMe(tmpUser.nick_name, visitingUser)) {
                resolveMe.canFollow = true;
              }
            }
          });
        });
      });
      resolve(resolveMe);
    });
  }
}
