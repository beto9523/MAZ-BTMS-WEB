import { TestBed } from '@angular/core/testing';

import { TestGeometryService } from './test-geometry.service';

describe('TestGeometryService', () => {
  let service: TestGeometryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestGeometryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
