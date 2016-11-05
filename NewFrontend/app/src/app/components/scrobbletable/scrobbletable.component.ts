import { Component, Input } from '@angular/core';
import { ScrobbleService } from '../../services';

@Component({
  selector: 'scrobble-table',
  templateUrl: './scrobbletable.component.html',
  styleUrls: ['./scrobbletable.component.scss']
})

export class ScrobbletableComponent {
  @Input() data: any;
  @Input() header: string;
  @Input() isOwner: boolean = false;

  constructor(private Scrobble: ScrobbleService) {}

  public rmScrobble(id: number | string, index: number) {
    this.Scrobble.deleteScrobble(id).subscribe((r: any) => {
      this.data[index].isFading = true;
      setTimeout(() => {
        this.data.splice(index, 1);
      }, 500);
    });
  }
}
