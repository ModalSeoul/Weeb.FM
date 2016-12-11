/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MarkdownService } from './markdown.service';

describe('Service: Markdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkdownService]
    });
  });

  it('should ...', inject([MarkdownService], (service: MarkdownService) => {
    expect(service).toBeTruthy();
  }));
});
