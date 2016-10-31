import { Component, OnInit } from '@angular/core';
import { ScrobbleService, GlobalService } from '../../services';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html'
})
export class RecentComponent implements OnInit {
  private scrobbles: Array<any> = [];

  constructor(
    private Scrobbles: ScrobbleService,
    private Global: GlobalService
  ) { }

  ngOnInit() {
    this.Scrobbles.getRecent(50).subscribe((r: any) => {
      this.scrobbles = r;
      this.Global.isLoading =  false;
    });
  }

}
