import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/index';

@Component({
  selector: 'scrobble-table',
  templateUrl: './scrobbletable.component.html',
  providers: [ HttpService ]
})

export class ScrobbletableComponent {
  @Input() content: any;
  @Input() header: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) {}


}
