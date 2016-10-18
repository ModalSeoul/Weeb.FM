/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BlogService } from './blog.service';

describe('Service: Blog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogService]
    });
  });

  it('should ...', inject([BlogService], (service: BlogService) => {
    expect(service).toBeTruthy();
  }));
});
