import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from '../../services';

@Component({
  selector: 'side-nav',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent {

  constructor(
    private auth: AuthService,
    private User: UserService,
    private router: Router
  ) {
  }

  public logout(): void {
    this.auth.logout();
  }

}
