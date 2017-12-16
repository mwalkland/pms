import { HttpClientModule } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';
import { StudentService } from './student.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

describe('Service: StudentProjects', () => {
  let backend: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StudentService,
        MockBackend
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should ...', inject([StudentService], (service: StudentService) => {
    expect(service).toBeTruthy();
    backend = TestBed.get(MockBackend);
  }));
});