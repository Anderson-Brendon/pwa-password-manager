import { TestBed } from '@angular/core/testing';

import { DatabaseRxDbService } from './database-rx-db.service';

describe('DatabaseRxDbService', () => {
  let service: DatabaseRxDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseRxDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
