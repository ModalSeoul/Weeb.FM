import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/index';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})

export class RegisterComponent implements OnInit {
  private username: string;
  private email: string;
  private password: string;
  private confPassword: string;
  private noMatch: boolean = false;

  constructor(
    private auth: AuthService,
    private app: AppComponent,
    private router: Router
  ) {
    // If user logged in, route to index
    if (auth.isLoggedIn()) {
      router.navigate(['/']);
    }
  }

  public ngOnInit() {
    this.app.loading = false;
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
