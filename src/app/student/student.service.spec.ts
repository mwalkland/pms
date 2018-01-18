import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../auth/user.model';
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StudentService } from './student.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';

describe('Service: StudentProjects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StudentService,
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('getStaff returns and processes all staff members',
    inject([StudentService, HttpTestingController], (service: StudentService, backend: HttpTestingController) => {
      let staffArray: User[];
      const staffResponse = {
        staff: [
          {
            email: 'test1@test.com',
            password: 'password1',
            firstname: 'john',
            surname: 'smith',
            type: 'Staff',
            staffInfo: {
              areas: ['']
            }
          },
          {
            email: 'test2@test.com',
            password: 'password2',
            firstname: 'bob',
            surname: 'smith',
            type: 'Staff',
            staffInfo: {
              areas: ['']
            }
          }
        ]
      };

      service.getStaff().subscribe((staff: User[]) => {
        staffArray = staff;
        const staff1 = staffArray[0];
        const staff2 = staffArray[1];
        expect(staff1.email).toBe('test1@test.com');
        expect(staff1.password).toBe('password1');
        expect(staff1.firstname).toBe('john');
        expect(staff1.surname).toBe('smith');
        expect(staff1.type).toBe('Staff');

        expect(staff2.email).toBe('test2@test.com');
        expect(staff2.password).toBe('password2');
        expect(staff2.firstname).toBe('bob');
        expect(staff2.surname).toBe('smith');
        expect(staff2.type).toBe('Staff');
      });

      backend.expectOne('http://localhost:3000/user/getStaff').flush(staffResponse);
    }));

});