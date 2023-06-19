import { TestBed } from '@angular/core/testing';

import { DataResService } from './data-res.service';

describe('DataResService', () => {
  let service: DataResService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataResService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
