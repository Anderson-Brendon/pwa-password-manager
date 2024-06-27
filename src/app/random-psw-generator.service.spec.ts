import { TestBed } from '@angular/core/testing';

import { RandomPswGeneratorService } from './random-psw-generator.service';

describe('RandomPswGeneratorService', () => {
  let service: RandomPswGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomPswGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
