import { TestBed } from '@angular/core/testing';

import { InterventionserviceService } from './interventionservice.service';

describe('InterventionserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterventionserviceService = TestBed.get(InterventionserviceService);
    expect(service).toBeTruthy();
  });
});
