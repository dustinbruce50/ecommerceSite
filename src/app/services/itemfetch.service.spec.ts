import { TestBed } from '@angular/core/testing';

import { ItemfetchService } from './itemfetch.service';

describe('ItemfetchService', () => {
  let service: ItemfetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemfetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
