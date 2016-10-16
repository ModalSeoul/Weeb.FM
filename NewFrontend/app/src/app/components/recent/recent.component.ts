import { Component, OnInit } from '@angular/core';
import { ScrobbleService } from '../../services/index';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
  private scrobbles: Array<any> = [];

  constructor(
    private Scrobbles: ScrobbleService,
    private app: AppComponent
  ) { }

  ngOnInit() {
    this.Scrobbles.getRecent(50).subscribe((r: any) => {
      this.scrobbles = r;
      this.app.loading =  false;
    });
  }

}
