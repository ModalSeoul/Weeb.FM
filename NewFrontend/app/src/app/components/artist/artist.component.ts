import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, GlobalService } from '../../services';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  private artist: string;
  private users: Array<any> = [];

  constructor(
    private Global: GlobalService,
    private route: ActivatedRoute,
    private User: UserService
  ) { }

  ngOnInit() {
    this.artist = this.route.snapshot.params['name'];
    this.User.listensTo(this.artist).subscribe((users: any) => {
      console.log(users);
      this.users = users;
      this.Global.isLoading = false;
    });
  }

}
