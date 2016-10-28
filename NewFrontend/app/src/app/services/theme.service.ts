import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {

  constructor() { }

  setStyle(style) {
    let links = document.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      if (link.getAttribute("rel").indexOf("style") != -1 && link.getAttribute("title")) {
        link.disabled = true;
        if (link.getAttribute("title") === style) {
          link.disabled = false;
        }
      }
    }
  }
}
