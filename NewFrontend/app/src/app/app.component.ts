import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `
    <side-nav></side-nav>
    <div class="__loading" *ngIf="loading">
      Loading
    </div>
    <div class="__weeb">
      <router-outlet></router-outlet>
    </div>`,
    providers: []
})

export class AppComponent implements OnInit {
  public loading: boolean = true;
  public lastRoute: string;

  constructor(
    private router: Router
  ) {}

  public ngOnInit() {
    this.router.events.subscribe((event: any) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: any): void {
    if (event instanceof NavigationStart) {
      // Sets loading overlay if navigation has started but not ended
      this.loading = true;

      // Checks if routing to current route, if so, loading = false.
      if (event.url == this.lastRoute) {
        this.loading = false;
      }
    }
    if (event instanceof NavigationEnd) {
      this.lastRoute = event.url;
    }
  }
}