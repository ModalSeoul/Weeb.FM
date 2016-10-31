import { Component, Input } from '@angular/core';

@Component({
  selector: 'scrobble-table',
  templateUrl: './scrobbletable.component.html'
})

export class ScrobbletableComponent {
  @Input() content: any;
  @Input() header: string;

  constructor() {}


}
