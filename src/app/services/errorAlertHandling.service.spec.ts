import { TestBed } from '@angular/core/testing';

import { ErrorAlertHandlingService } from './errorAlertHandling.service';

describe('ErrorAlertHandlingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorAlertHandlingService = TestBed.get(ErrorAlertHandlingService);
    expect(service).toBeTruthy();
  });
});
