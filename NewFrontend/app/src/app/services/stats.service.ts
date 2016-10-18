import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class StatsService {

  constructor(private http: HttpService) { }

  public scrobbleCount() {
    return this.http.get('scrobbles/count').map((r: any) => {
      return r;
    });
  }

}
