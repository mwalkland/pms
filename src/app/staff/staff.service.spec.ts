import { HttpClientModule } from '@angular/common/http';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StaffService } from './staff.service';

describe('Service: Staff', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffService],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should ...', inject([StaffService], (service: StaffService) => {
    expect(service).toBeTruthy();
  }));
});