import { Component, Input } from '@angular/core';

@Component({
  selector: 'scrobble-table',
  templateUrl: './scrobbletable.component.html',
  styleUrls: ['./scrobbletable.component.scss'],
})

export class ScrobbletableComponent {
  @Input() content: any;
  @Input() header: string;

  constructor() {}


}
