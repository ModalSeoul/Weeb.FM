import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/index';

@Component({
    selector: 'profile',
    template: `<h2>Profile Component</h2>`,
    providers: [ HttpService ],
    directives: [ ROUTER_DIRECTIVES ],
})

export class ProfileComponent implements OnInit {
  private uid: number;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.uid = this.route.snapshot.params['id'];
    this.http.get('members/1').subscribe((r: any) => {
      console.log(r);
    });
  }
}
