import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  UserService,
  BlogService,
  GlobalService,
  FeaturedService
} from '../../services';
import { MarkdownService } from '../../services';
import { DomSanitizer } from '@angular/platform-browser/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  private loggedIn: boolean = false;
  private feature: any = {};
  private url: any;

  constructor(
    private Auth: AuthService,
    private User: UserService,
    private Global: GlobalService,
    private Featured: FeaturedService,
    private sanitizer: DomSanitizer,
    private md: MarkdownService
  ) {
    // Setting loggedIn property based on user status
    if (this.Auth.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

  public ngOnInit() {
    this.Featured.currentlyFeatured().subscribe((r: any) => {
      this.feature = r[0];
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(r[0].link);
      this.Global.isLoading = false;
      this.feature.note = this.parseMarkdown(this.feature.note);
    });
  }

  parseMarkdown(toParse: string): string {
    let md = this.md.convert(toParse);
    return md.replace(/a href=/g,"a target='_blank' href=");
  }

}
