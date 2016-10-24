import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from '../../services/index';

@Component({
  selector: 'side-nav',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [ AuthService, UserService ]
})

export class SidebarComponent {
  public curUser: string;

  constructor(
    private auth: AuthService,
    private user: UserService,
    private router: Router
  ) {
    user.getCurrentUser().subscribe((r: any) => {
      this.curUser = r.nick_name;
    });
  }

  public logout(): void {
    this.auth.logout();
  }

}
