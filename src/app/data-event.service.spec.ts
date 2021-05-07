import { TestBed } from '@angular/core/testing';

import { DataEventService } from './data-event.service';

describe('DataEventService', () => {
  let service: DataEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
