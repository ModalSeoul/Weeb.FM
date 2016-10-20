import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class BlogService {

  constructor(
    private http: HttpService
  ) { }

  public getAll() {
    return this.http.get('blog_entries').map((r: any) => {
      return r;
    });
  }

  public post() {
    return this.http.post('blog_entries', {
      'title': 'NICE TITLE',
      'body': 'This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. This is body text man. '
    }).map((r: any) => {
      return r;
    });
  }
}
