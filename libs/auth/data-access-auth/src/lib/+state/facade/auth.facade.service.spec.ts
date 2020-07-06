import { TestBed } from '@angular/core/testing';

import { Auth.FacadeService } from './auth.facade.service';

describe('Auth.FacadeService', () => {
  let service: Auth.FacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth.FacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
