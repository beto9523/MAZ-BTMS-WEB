import { TestBed } from '@angular/core/testing';

import { TestMethodService } from './test-method.service';

describe('TestMethodService', () => {
  let service: TestMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
