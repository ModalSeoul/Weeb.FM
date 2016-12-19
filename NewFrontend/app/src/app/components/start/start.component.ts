import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {
  public scrobblers : any;

  constructor(
    private Global: GlobalService
  ) { }

  ngOnInit() {
    this.Global.isLoading = false;
    this.scrobblers = [
      {
        name: 'Chrome Extension (Bandcamp, Google Play, Pandora)',
        link: 'https://github.com/ModalSeoul/Weeb-Chrome-Scrobbler'
      },
      {
        name: 'Foobar2000',
        link: '/static/Foobar.exe'
      },
      {
        name: 'MPD',
        link: 'https://github.com/ModalSeoul/mpd-scrobbler'
      },
      {
        name: 'MusicBee - Many thanks to Anima',
        link: 'https://github.com/Animaclept/wilt-fm-musicbee-plugin'
      },
      {
        name: 'RipFM (From Last.fm to Wilt) - REQUIRES EDIT OF run.bat',
        link: '/static/ripfm.zip'
      },
      {
        name: 'Kodi (Make sure Kodi\'s web daemon is on, and on port 8080) - REQUIRES EDIT OF run.bat',
        link: '/static/kodi.zip'
      },
      {
        name: 'Google Play Music Desktop Player - Many thanks to Scratso',
        link: 'https://github.com/Scratso/Wilted'
      }
    ];
  }

}
