import { TestBed } from '@angular/core/testing';

import { AllFirebaseServiceService } from './all-firebase-service.service';

describe('AllFirebaseServiceService', () => {
  let service: AllFirebaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllFirebaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
