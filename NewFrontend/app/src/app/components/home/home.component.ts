import { Component, OnInit } from '@angular/core';
import { AuthService, UserService, BlogService } from '../../services/index';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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

  public ngOnInit() {
    this.Blog.getAll().subscribe((posts: any) => {
      this.entries = posts;
    });
  }

}
