import { TestBed } from '@angular/core/testing';

import { HubPickupService } from './hub-pickup.service';

describe('HubPickupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HubPickupService = TestBed.get(HubPickupService);
    expect(service).toBeTruthy();
  });
});
