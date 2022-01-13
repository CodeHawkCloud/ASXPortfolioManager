import { TestBed } from '@angular/core/testing';

import { AddAndSellService } from './add-and-sell.service';

describe('AddAndSellService', () => {
  let service: AddAndSellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAndSellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
