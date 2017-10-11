import {inject, TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {LoginModule} from '../login.module';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginModule],
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
