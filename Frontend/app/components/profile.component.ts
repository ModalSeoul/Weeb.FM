import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpService, ScrobbleService } from '../services/index';

@Component({
    selector: 'profile',
    template: `<h2>Profile Component</h2>`,
    providers: [
      HttpService,
      ScrobbleService
    ],
    directives: [ ROUTER_DIRECTIVES ],
})

export class ProfileComponent implements OnInit {
  private uid: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private Scrobble: ScrobbleService
  ) {}

  public ngOnInit() {
    this.uid = this.route.snapshot.params['id'];
    this.Scrobble.getUserScrobbles('admin').subscribe((r: any) => {
      console.log(r);
    });
  }


}
