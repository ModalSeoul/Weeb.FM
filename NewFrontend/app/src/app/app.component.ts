import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ThemeService } from './services';

@Component({
    selector: 'app-root',
    template: `
    <side-nav></side-nav>
    <div class="loading" *ngIf="loading">
      <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
    </div>
    <div class="weebContainer">
      <router-outlet></router-outlet>
    </div>`,
    providers: [],
})

export class AppComponent implements OnInit {
  public loading: boolean = true;
  public lastRoute: string;

  private currentTheme: string;

  constructor(
    private router: Router,
    private theme: ThemeService,
    private cookies: CookieService
  ) {}

  public ngOnInit() {
    this.router.events.subscribe((event: any) => {
      this.navigationInterceptor(event);
    });

    if (!this.cookies.get('theme')) {
      this.cookies.put('theme', 'light');
      this.currentTheme = 'light';
    } else {
      this.currentTheme = this.cookies.get('theme');
    }
    this.theme.setStyle(this.currentTheme);
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
