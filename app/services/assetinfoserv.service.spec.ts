import { TestBed } from '@angular/core/testing';

import { AssetinfoservService } from './assetinfoserv.service';

describe('AssetinfoservService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetinfoservService = TestBed.get(AssetinfoservService);
    expect(service).toBeTruthy();
  });
});
