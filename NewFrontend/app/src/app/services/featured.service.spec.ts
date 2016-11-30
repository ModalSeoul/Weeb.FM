/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeaturedService } from './featured.service';

describe('Service: Featured', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturedService]
    });
  });

  it('should ...', inject([FeaturedService], (service: FeaturedService) => {
    expect(service).toBeTruthy();
  }));
});
