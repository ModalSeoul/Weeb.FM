import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/mergeMap';

import { HttpService } from './http.service';
import config from './api.config';

interface IResponseToken {
  token: string;
  id: string;
};

interface IUser {
  id?: string;
};

@Injectable()
export class AuthService {
  public userRxSubject$ = new ReplaySubject<IUser>();
  public user$ = this.userRxSubject$.asObservable();
  public user: IUser = {};

  private AUTH_TOKEN_HEADER = 'Authorization';

  constructor(
    private http: HttpService,
    private cookies: CookieService,
    private router: Router
  ) {
    const storedUser = cookies.get('user');
    if (storedUser) {
      const user: IResponseToken = JSON.parse(storedUser);
      this.setAuthToken(user.token);
      this.http.get(`members/${user.token}/by_token`).subscribe((r: any) => {
        this.getUser(r.id);
      });
    }
  }

  public login(username: string, password: string): Observable<IUser> {
    this.http.resetHeaders();
    const request = this.http.post('api-token-auth', { username, password });

    return request.mergeMap((response: IResponseToken) => {
      this.cookies.putObject('user', response);
      this.setAuthToken(response.token);
      return this.http.get(`members/${response.token}/by_token`).map((r: any) => {
        this.getUser(r['id']);
      });
    });
  }

  public register(username: string, password: string, email: string) {
    const request = this.http.post('members', {
      username: username,
      password: password,
      email: email,
      nick_name: username // Temporary
    });

    return request.map((response: any) => {
      this.router.navigate(['login']);
      return response;
    });
  }

  public isLoggedIn(): boolean {
    const lUser = this.cookies.get('user');
    return !!(this.user.id || lUser);
  }

  public getCookie() {
    return JSON.parse(this.cookies.get('user')).token;
  }

  public logout(): void {
    this.router.navigate(['login']);
    this.http.clearToken(this.AUTH_TOKEN_HEADER);
    this.user = {};
    this.cookies.remove('user');
    this.userRxSubject$.next(this.user);
  }

  public getUser(id: string): Observable<Object> {
    const userRequest = this.http.get(`members/${id}`);
    userRequest.subscribe((user: IUser) => {
      this.user = user;
      this.userRxSubject$.next(user);
    });
    return userRequest;
  }

  public resetPassword (email: string): Observable<Object> {
    return this.http.post(`${config.resetPasswordUrl}/${email}`, {});
  }

  private setAuthToken(token: string): void {
    this.http.updateHeader(this.AUTH_TOKEN_HEADER, 'Token ' + token);
    // this.api.updateHeader(this.AUTH_TOKEN_HEADER, 'Token ' + token);
  }
}

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  public canActivate() {
    let worthy = this.auth.isLoggedIn(); // protect the realms of AuthGuard
    if (!worthy) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
