import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';
import { AuthService, GlobalService } from '../../services';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  private username: string;
  private password: string;
  private rememberMe: boolean = false;
  private errorString: string;

  constructor(
    private auth: AuthService,
    private Global: GlobalService,
    private router: Router,
    private cookies: CookieService
  ) {
    // If user logged in, route to index
    if (auth.isLoggedIn()) {
      router.navigate(['/']);
    }

    let savedUser = this.cookies.get('saved-user');
    if (savedUser != null) {
      this.username = savedUser;
      this.rememberMe = true;
    }
  }

  public ngOnInit() {
    this.Global.isLoading = false;
  }

  public login() {
    if (this.rememberMe) {
      let expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 30);
      this.cookies.put('saved-user', this.username, {'expires': expireDate});
    } else {
      this.cookies.put('saved-user', null);
    }
    // Use window.location instead of router to reload state
    this.auth.login(this.username, this.password)
      .subscribe(() => { document.location.href = "/";
      }, (err) => {
        var errMessages = err.json();
        if (errMessages.username) {
          this.errorString = `Username: ${errMessages.username[0]}`;
          return;
        }
        if (errMessages.password) {
          this.errorString = `Password: ${errMessages.password[0]}`;
          return;
        }
        if (errMessages.non_field_errors) {
          this.errorString = `${errMessages.non_field_errors[0]}`
          return;
        }
        // else
        this.errorString = `${err._body}`;
      });
  }

  public resetPassword() {
    this.auth.resetPassword(this.username).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
