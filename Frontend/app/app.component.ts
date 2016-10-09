import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationStart, NavigationEnd } from '@angular/router';

@Component({
    selector: 'my-app',
    template: `
    <side-nav></side-nav>
    <div class="__loading" *ngIf="loading">
      Loading
    </div>
    <div class="__weeb">
      <router-outlet></router-outlet>
    </div>`
})

export class AppComponent implements OnInit {
  public loading: boolean = true;
  public lastRoute: string;

  constructor(
    private router: Router,
    private ActiveRoute: ActivatedRoute
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
