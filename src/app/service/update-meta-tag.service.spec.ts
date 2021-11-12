import { TestBed } from '@angular/core/testing';

import { UpdateMetaTagService } from './update-meta-tag.service';

describe('UpdateMetaTagService', () => {
  let service: UpdateMetaTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateMetaTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
