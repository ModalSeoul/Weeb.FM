import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from '../../services/index';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ AuthService, UserService ]
})

export class HomeComponent implements OnInit {
  private curUser: any = {};
  private loggedIn: boolean = false;

  constructor(
    private auth: AuthService,
    private user: UserService,
    private app: AppComponent
  ) {
    console.log(this.auth.isLoggedIn());
    // Setting loggedIn property based on user status
    if (this.auth.isLoggedIn()) {
      this.loggedIn = true;
    }
    console.log(this.loggedIn);
  }

  public ngOnInit() {
    this.user.getCurrentUser().subscribe(
      data => {
        this.curUser = data;
        this.app.loading = false;
      },
      err => this.app.loading = false,
      () => console.log('We did it boss.')
    );
  }

}
