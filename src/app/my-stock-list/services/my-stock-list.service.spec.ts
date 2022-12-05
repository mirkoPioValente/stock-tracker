import { TestBed } from '@angular/core/testing';

import { MyStockListService } from './my-stock-list.service';

describe('MyStockListService', () => {
  let service: MyStockListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyStockListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
