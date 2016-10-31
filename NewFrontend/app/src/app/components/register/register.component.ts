import { Component, OnInit } from '@angular/core';
import { AuthService, GlobalService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  private username: string;
  private email: string;
  private password: string;
  private confPassword: string;
  private noMatch: boolean = false;

  constructor(
    private auth: AuthService,
    private Global: GlobalService,
    private router: Router
  ) {
    // If user logged in, route to index
    if (auth.isLoggedIn()) {
      router.navigate(['/']);
    }
  }

  public ngOnInit() {
    this.Global.isLoading = false;
  }

  public register() {
    if (this.password != this.confPassword) {
      this.noMatch = true;
    }
    if (this.password === this.confPassword && this.noMatch) {
      this.noMatch = false;
    }

    if (!this.noMatch) {
      this.auth.register(
        this.username,
        this.password,
        this.email
      ).subscribe(
        (r: any) => {
          // We did it, cory in da house???
        },
        err => alert('Illegal characters or the server\'s having issues.'));
    }
  }
}
