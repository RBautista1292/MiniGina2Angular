import { TestBed } from '@angular/core/testing';

import { DataReservationService } from './data-reservation.service';

describe('DataReservationService', () => {
  let service: DataReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
