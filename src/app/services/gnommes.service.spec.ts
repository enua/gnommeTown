import { TestBed } from '@angular/core/testing';

import { GnommesService } from './gnommes.service';

describe('GnommesService', () => {
  let service: GnommesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GnommesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
