import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { UserService } from '../../services';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  private artist: string;
  private users: Array<any> = [];

  constructor(
    private app: AppComponent,
    private route: ActivatedRoute,
    private User: UserService
  ) { }

  ngOnInit() {
    this.artist = this.route.snapshot.params['name'];
    this.User.listensTo(this.artist).subscribe((users: any) => {
      console.log(users);
      this.users = users;
      this.app.loading = false;
    });
  }

}
