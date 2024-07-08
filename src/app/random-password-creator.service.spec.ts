import { TestBed } from '@angular/core/testing';

import { RandomPasswordCreatorService } from './random-password-creator.service';

describe('RandomPasswordCreatorService', () => {
  let service: RandomPasswordCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomPasswordCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
