import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/index';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthService ]
})

export class LoginComponent implements OnInit {
  private username: string;
  private password: string;

  constructor(
    private auth: AuthService,
    private app: AppComponent,
    private router: Router
  ){
    // If user logged in, route to index
    if (auth.isLoggedIn()) {
      router.navigate(['/']);
    }
  }

  public ngOnInit() {
      this.app.loading = false;
  }

  public login() {
    // Use window.location instead of router to reload state
    this.auth.login(this.username, this.password)
      .subscribe(() => this.router.navigate(['/']));
  }

  public resetPassword() {
    this.auth.resetPassword(this.username)
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
