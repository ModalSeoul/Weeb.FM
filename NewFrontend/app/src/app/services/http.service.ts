import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

let isDev: boolean = false;
let apiUrl: string;

if (!isDev) {
  apiUrl = 'https://modal.moe/api/';
} else {
  apiUrl = 'http://localhost:8000/api/';
}

@Injectable()
export class HttpService {

  private headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  constructor(private http: Http) {

  }

  public resetHeaders (): void {
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
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

  public delete (url: string, body: any = {}, params: any = {}) {
    return this.request('delete', url, body, params);
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
