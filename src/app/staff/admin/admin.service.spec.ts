/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminService } from './admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Admin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([AdminService], (service: AdminService) => {
    expect(service).toBeTruthy();
  }));
});