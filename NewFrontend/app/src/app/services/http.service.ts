import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

let isDev: boolean = true;
let apiUrl: string;

if (!isDev) {
  apiUrl = 'https://wilt.fm/api/';
} else {
  apiUrl = 'http://localhost:8000/api/';
}

@Injectable()
export class HttpService {

  private headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'cf7ddd58b5a9c13c46c15d2b9f861bca2b3a6cfc'
  };

  constructor(private http: Http) {}

  public resetHeaders (): void {
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'cf7ddd58b5a9c13c46c15d2b9f861bca2b3a6cfc'
    };
  }

  public updateHeader (key: string, value: string) {
    this.headers[key] = value;
  }

  public clearToken(key: string): void {
    delete this.headers[key];
  }

  public get (url: string, params: any = {}) {
    url = `${apiUrl}${url}`;
    return this.request('get', url, {}, params);
  }

  public post (url: string, body: any = {}, params: any = {}) {
    url = `${apiUrl}${url}`;
    return this.request('post', url, body, params);
  }

  public put (url: string, body: any = {}, params: any = {}) {
    return this.request('put', url, body, params);
  }
  //
  // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
  // let options = new RequestOptions({ headers: headers });
  //
  // get(path: string){
  //     return this.http.get(path, options)
  // };

  public delete (url: string) {
    url = `${apiUrl}${url}`;
    let headers = new Headers({'Authorization': 'cf7ddd58b5a9c13c46c15d2b9f861bca2b3a6cfc'});
    let options = new RequestOptions({ headers: headers});
    return this.http.delete(url, options)
  }

  private request(method: string, url: string, body: any = {}, params: any = {}) {
    let headers = new Headers(this.headers);

    let endsInSlashOrParams = /.*\/$|.*\?.*/g;
    if (!endsInSlashOrParams.test(url)) {
      url += '/';
    }

    // build param string
    let paramStr = Object.keys(params).reduce((acc, cur, i) => `${acc}${i > 0 ? '&' : ''}${cur}=${params[cur]}`, '');

    let options = new RequestOptions({ headers, search: paramStr });
    console.log(options);
    let obs: any;

    if (method.toLowerCase() === 'get') {
      obs = this.http[method](url, options);
    } else {
      obs = this.http[method](url, body, options);
    }

    return obs.map((res: Response) => {
      try {
        return res.json();
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
      }

      return {};
    });
  }
}
