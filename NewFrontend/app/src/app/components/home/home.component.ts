import { Component, OnInit } from '@angular/core';
import { AuthService, UserService, BlogService } from '../../services/index';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ AuthService, UserService ]
})

export class HomeComponent implements OnInit {
  private curUser: any = {};
  private entries: Array<any>;
  private loggedIn: boolean = false;

  constructor(
    private Auth: AuthService,
    private User: UserService,
    private Blog: BlogService,
    private app: AppComponent
  ) {
    console.log(this.Auth.isLoggedIn());
    // Setting loggedIn property based on user status
    if (this.Auth.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

  public post() {
    this.Blog.post().subscribe((r: any) => {
      console.log(r);
    });
  }

  public ngOnInit() {
    this.Blog.getAll().subscribe((posts: any) => {
      this.entries = posts;
    });
    this.User.getCurrentUser().subscribe(
      data => {
        this.curUser = data;
        this.app.loading = false;
      },
      err => this.app.loading = false,
      () => console.log('We did it boss.')
    );
  }

}
