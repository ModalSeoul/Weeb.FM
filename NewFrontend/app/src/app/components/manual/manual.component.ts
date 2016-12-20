import { Component, OnInit } from '@angular/core';
import { ScrobbleService, UserService } from '../../services';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {

  // I'm still writing this tbh

  constructor(
    private Scrobble: ScrobbleService,
    private User: UserService
  ) { }

  ngOnInit() {
  }

}
