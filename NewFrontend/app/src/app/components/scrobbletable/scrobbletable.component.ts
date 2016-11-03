import { Component, Input } from '@angular/core';
import { ScrobbleService } from '../../services';

@Component({
  selector: 'scrobble-table',
  templateUrl: './scrobbletable.component.html',
})

export class ScrobbletableComponent {
  @Input() data: any;
  @Input() header: string;
  @Input() isOwner: boolean = false;

  constructor(private Scrobble: ScrobbleService) {}

  public rmScrobble(id: number | string) {
    this.Scrobble.deleteScrobble(id).subscribe((r: any) => {
      alert('deleted');
    });
  }
}
