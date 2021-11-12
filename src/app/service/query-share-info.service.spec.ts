import { TestBed } from '@angular/core/testing';

import { QueryShareInfoService } from './query-share-info.service';

describe('QueryShareInfoService', () => {
  let service: QueryShareInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryShareInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
