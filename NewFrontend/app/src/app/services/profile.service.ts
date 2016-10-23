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

  public canFollow(visitingUser: string) {
    return new Promise((resolve, reject) => {
      let resolveMe: any = {};
      this.User.getCurrentUser().subscribe((r: any) => {
        let tmpUser: any = r;
        // if the user isn't viewing their own profile, display follow button
        this.User.getUserObject(visitingUser).subscribe((visitingObj: any) => {
          console.log(visitingObj);
          resolveMe.avatar = `https://modal.moe/cdn${visitingObj.profile_picture}`;
          resolveMe.nick = visitingObj.nick_name;
          resolveMe.listen_count = visitingObj.listen_count;
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
