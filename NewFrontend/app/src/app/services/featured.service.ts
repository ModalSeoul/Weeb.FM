import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import 'rxjs/add/operator/cache';

@Injectable()
export class FeaturedService {

  constructor(private http: HttpService) {

  }

  public currentlyFeatured() {
    const network$ = this.http.get('featured/current/?active=True').cache();
    network$.subscribe();
    return network$;
  }
}
