import { Injectable } from '@angular/core';
import * as marked from 'marked';

@Injectable()
export class MarkdownService {

  private md: MarkedStatic;

  constructor() {
    this.md = marked;

    this.md.setOptions({
      gfm: true,
      breaks: true
    });
  }

  convert(markdown: string) {
    console.log(this.md.parse(markdown));
    return this.md.parse(markdown);
  }

}
