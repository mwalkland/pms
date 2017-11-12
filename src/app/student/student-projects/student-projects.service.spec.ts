/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentProjectsService } from './student-projects.service';

describe('Service: StudentProjects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentProjectsService]
    });
  });

  it('should ...', inject([StudentProjectsService], (service: StudentProjectsService) => {
    expect(service).toBeTruthy();
  }));
});