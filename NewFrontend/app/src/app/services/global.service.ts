import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Injectable()
export class GlobalService {
  public isLoading: boolean = false;
  public lastRoute: string;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: any): void {
    if (event instanceof NavigationStart) {
      this.isLoading = true;

      if (event.url === this.lastRoute) {
        this.isLoading = false;
      }
    }
    if (event instanceof NavigationEnd) {
      this.lastRoute = event.url;
    }
  }
}
