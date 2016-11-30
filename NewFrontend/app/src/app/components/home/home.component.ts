import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  UserService,
  BlogService,
  GlobalService
} from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  private curUser: any = {};
  private entries: Array<any>;
  private loggedIn: boolean = false;

  constructor(
    private Auth: AuthService,
    private User: UserService,
    private Blog: BlogService,
    private Global: GlobalService
  ) {
    // Setting loggedIn property based on user status
    if (this.Auth.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

  public ngOnInit() {
    this.Blog.getAll().subscribe((posts: any) => {
      this.entries = posts;
      this.Global.isLoading = false;
    });
  }

}
