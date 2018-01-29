import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../auth/user.model';
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StudentService } from './student.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { Project } from '../core/project.model';

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

      backend.expectOne(req => req.url.endsWith('/user/getStaff')).flush(staffResponse);
    }));

  it('getAreas returns areas array',
    inject([StudentService, HttpTestingController], (service: StudentService, backend: HttpTestingController) => {
      const areasResponse = {
        areas: [
          'area1',
          'areas2',
          'areas3',
          'areas4',
          'areas5'
        ]
      };
      console.log('fdgfd')
      service.getAreas().subscribe((areas: string[]) => {
        expect(areas).toEqual(areasResponse.areas);
      });

      backend.expectOne(req => req.url.endsWith('/project/getAreas')).flush(areasResponse);
    })
  );

  it('getStaffProjects returns and processes all projects',
    inject([StudentService, HttpTestingController], (service: StudentService, backend: HttpTestingController) => {
      const projectResponse = {
        projects: [
          {
            _id: '1',
            name: 'name',
            description: 'desc',
            type: 'type',
            maxStudents: 1,
            areas: ['area']
          }
        ]
      };
      service.getStaffProjects().subscribe((projects: Project[]) => {
        const project = projects[0];
        expect(project.id).toBe('1');
        expect(project.name).toBe('name');
        expect(project.type).toBe('type');
        expect(project.maxStudents).toBe(1);
        expect(project.areas).toContain('area');
      });

      backend.expectOne(req => req.url.endsWith('/project/getAllStaffProjects')).flush(projectResponse);
    })
  );

  it('getStudentProject returns and processes the Project',
    inject([StudentService, HttpTestingController], (service: StudentService, backend: HttpTestingController) => {
      const projectResponse = {
        project: {
          _id: '1',
          name: 'name',
          description: 'desc',
          type: 'type',
          maxStudents: 1,
          areas: ['area']
        },
        supervisor: {}
      };
      service.getStudentProject().subscribe((project: Project) => {
        expect(project.id).toBe('1');
        expect(project.name).toBe('name');
        expect(project.type).toBe('type');
        expect(project.maxStudents).toBe(1);
        expect(project.areas).toContain('area');
        expect(project.staff).toEqual({});
      });

      backend.expectOne(req => req.url.endsWith('/project/getStudentProject')).flush(projectResponse);
    })
  );
});