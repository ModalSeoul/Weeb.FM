import { Component, OnInit } from '@angular/core';
// import { HTTP_PROVIDERS } from '@angular/http';
import { HttpService } from './services/index';

@Component({
    selector: 'my-app',
    template: '<h1>Weeb FM Frontend</h1>',
    providers: [HttpService]
})
export class AppComponent implements OnInit {

  constructor(private http: HttpService) {}

  public ngOnInit() {
    this.http.get('http://localhost:8000/api/scrobbles/').subscribe((r: any) => {
      console.log(r);
    });
  }
}
