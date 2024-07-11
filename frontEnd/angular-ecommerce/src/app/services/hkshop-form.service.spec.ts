import { TestBed } from '@angular/core/testing';

import { HKShopFormService } from './hkshop-form.service';

describe('HKShopFormService', () => {
  let service: HKShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HKShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
