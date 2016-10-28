/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalService } from './global.service';

describe('Service: Global', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalService]
    });
  });

  it('should ...', inject([GlobalService], (service: GlobalService) => {
    expect(service).toBeTruthy();
  }));
});
