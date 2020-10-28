import { TestBed } from '@angular/core/testing';

import { InventaireService } from './inventaire.service';

describe('InventaireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventaireService = TestBed.get(InventaireService);
    expect(service).toBeTruthy();
  });
});
