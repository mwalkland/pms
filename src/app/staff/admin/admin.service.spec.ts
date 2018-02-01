/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminService } from './admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Student } from './student.model';
import { Staff } from './staff.model';

describe('Service: Admin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('getAllStudents creates and returns all students',
    inject([AdminService, HttpTestingController], (service: AdminService, backend: HttpTestingController) => {
      const response = {
        students: [
          {
            _id: 'id',
            email: 'email',
            firstname: 'first',
            surname: 'last',
            studentInfo: {
              chosenProject: {
                _id: 'project_id',
                name: 'project_name',
                description: 'project_desc',
                type: 'project_type',
                maxStudents: 1,
                areas: ['area1', 'area2'],
                staff: { name: 'staff_name' },
                isStudentProject: true
              },
              supervisor: {
                _id: 'supervisor_id',
                email: 'supervisor_email',
                firstname: 'supervisor_first',
                surname: 'supervisor_last',
              },
              confirmed: false
            }
          }
        ]
      };

      service.getAllStudents().subscribe((students: Student[]) => {
        expect(students.length).toBe(1);
        const student = students[0];
        const supervisor = student.supervisor;
        expect(student.id).toBe('id');
        expect(student.email).toBe('email');
        expect(student.firstname).toBe('first');
        expect(student.surname).toBe('last');
        expect(student.projectname).toBe('project_name');
        expect(student.projectDesc).toBe('project_desc');

        expect(supervisor._id).toBe('supervisor_id');
        expect(supervisor.email).toBe('supervisor_email');
        expect(supervisor.firstname).toBe('supervisor_first');
        expect(supervisor.surname).toBe('supervisor_last');
        expect(student.confirmed).toBe('No');
        expect(student.supervisorName).toBe('supervisor_first supervisor_last');
      });

      backend.expectOne(req => req.url.endsWith('/getAllStudents')).flush(response);

    }));

  it('getAllStaff creates and returns all staff with projects',
    inject([AdminService, HttpTestingController], (service: AdminService, backend: HttpTestingController) => {
      const response = {
        students: [
          {
            _id: 'id',
            email: 'email',
            firstname: 'first',
            surname: 'last',
            studentInfo: {
              chosenProject: {
                _id: 'project_id',
                name: 'project_name',
                description: 'project_desc',
                type: 'project_type',
                maxStudents: 1,
                areas: ['area1', 'area2'],
                staff: { name: 'staff_name' },
                isStudentProject: true
              },
              supervisor: {
                _id: 'supervisor_id',
                email: 'supervisor_email',
                firstname: 'supervisor_first',
                surname: 'supervisor_last',
              },
              confirmed: false
            }
          }
        ],
        staff: [
          {
            _id: 'supervisor_id',
            email: 'supervisor_email',
            firstname: 'supervisor_first',
            surname: 'supervisor_last',

          }
        ]
      };

      service.getAllStaff().subscribe((staffList: Staff[]) => {
        expect(staffList.length).toBe(1);
        const staff = staffList[0];
        expect(staff._id).toBe('supervisor_id');
        expect(staff.email).toBe('supervisor_email');
        expect(staff.firstname).toBe('supervisor_first');
        expect(staff.surname).toBe('supervisor_last');
        expect(staff.noOfStudents).toBe(1);

        const projects = staff.projects;
        expect(projects.length).toBe(1);
        const project = projects[0];
        expect(project.name).toBe('project_name');
        expect(project.areas).toContain('area1');
        expect(project.areas).toContain('area2');
        expect(project.confirmed).toBe(false);
        expect(project.description).toBe('project_desc');
        expect(project.staffEmail).toBe('supervisor_email');
        expect(project.staffId).toBe('supervisor_id');
        expect(project.staffName).toBe('supervisor_first supervisor_last');
        expect(project.studentName).toBe('first last');
        expect(project.type).toBe('project_type');
      });

      backend.expectOne(req => req.url.endsWith('/getAllStaff')).flush(response);
    })
  );

});