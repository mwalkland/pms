import { TestBed, async, inject } from '@angular/core/testing';
import { StaffService } from './staff.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { Areas } from './staff-profile/staff-profile-details/areas.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Project } from '../core/project.model';

describe('Service: Staff', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('getStaffAreas returns and processes the areas',
    inject([StaffService, HttpTestingController], (service: StaffService, backend: HttpTestingController) => {
      const areasResponse = {
        areas: {
          staffInfo: {
            areas: {
              first: 'first',
              second: 'second',
              third: 'third',
              fourth: 'fourth',
              fifth: 'fifth',
            }
          }
        }
      };

      service.getStaffAreas().subscribe((areas: Areas) => {
        expect(areas.first).toBe('first');
        expect(areas.second).toBe('second');
        expect(areas.third).toBe('third');
        expect(areas.fourth).toBe('fourth');
        expect(areas.fifth).toBe('fifth');
      });

      backend.expectOne(req => req.url.endsWith('/getStaffAreas')).flush(areasResponse);
    }));

  it('getStaffProjects returns and processes the projects',
    inject([StaffService, HttpTestingController], (service: StaffService, backend: HttpTestingController) => {
      const projectsResponse = {
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
        expect(projects.length).toBe(1);
        const project = projects[0];
        expect(project.id).toBe('1');
        expect(project.name).toBe('name');
        expect(project.type).toBe('type');
        expect(project.maxStudents).toBe(1);
        expect(project.areas).toContain('area');
      });

      backend.expectOne(req => req.url.endsWith('/getStaffProjects')).flush(projectsResponse);
    })
  );

  it('getProjectRequests returns and processes all projects',
    inject([StaffService, HttpTestingController], (service: StaffService, backend: HttpTestingController) => {
      const response = {
        students: [
          {
            _id: 'id',
            email: 'email',
            firstname: 'first',
            surname: 'last',
            type: 'student',
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
              }
            }
          }
        ]
      };

      service.getProjectRequests().subscribe((projects: Project[]) => {
        expect(projects.length).toBe(1);
        const project = projects[0];
        expect(project.id).toBe('project_id');
        expect(project.name).toBe('project_name');
        expect(project.description).toBe('project_desc');
        expect(project.type).toBe('project_type');
        expect(project.maxStudents).toBe(1);
        expect(project.areas).toContain('area1');
        expect(project.areas).toContain('area2');
        expect(project.staff).toEqual({ name: 'staff_name' });
        expect(project.isStudentProject).toBe(true);

        expect(project.student.id).toBe('id');
        expect(project.student.email).toBe('email');
        expect(project.student.firstname).toBe('first');
        expect(project.student.surname).toBe('last');
        expect(project.student.type).toBe('student');
      });

      backend.expectOne(req => req.url.endsWith('/getProjectRequests')).flush(response);
    })
  );

  it('getConfirmedProjects returns and processes all projects',
    inject([StaffService, HttpTestingController], (service: StaffService, backend: HttpTestingController) => {
      const response = {
        students: [
          {
            _id: 'id',
            email: 'email',
            firstname: 'first',
            surname: 'last',
            type: 'student',
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
              }
            }
          }
        ]
      };

      service.getConfirmedProjects().subscribe((projects: Project[]) => {
        expect(projects.length).toBe(1);
        const project = projects[0];
        expect(project.id).toBe('project_id');
        expect(project.name).toBe('project_name');
        expect(project.description).toBe('project_desc');
        expect(project.type).toBe('project_type');
        expect(project.maxStudents).toBe(1);
        expect(project.areas).toContain('area1');
        expect(project.areas).toContain('area2');
        expect(project.staff).toEqual({ name: 'staff_name' });
        expect(project.isStudentProject).toBe(true);

        expect(project.student.id).toBe('id');
        expect(project.student.email).toBe('email');
        expect(project.student.firstname).toBe('first');
        expect(project.student.surname).toBe('last');
        expect(project.student.type).toBe('student');
      });

      backend.expectOne(req => req.url.endsWith('/getConfirmedProjects')).flush(response);
    })
  );

  it('getSuggestedAreas returns and processes all areas',
    inject([StaffService, HttpTestingController], (service: StaffService, backend: HttpTestingController) => {
      const response = {
        areas: ['area1', 'area2', 'area3', 'area4', 'area5']
      };

      service.getSuggestedAreas().subscribe((areas: string[]) => {
        expect(areas).toEqual(['area1', 'area2', 'area3', 'area4', 'area5']);
      });

      backend.expectOne(req => req.url.endsWith('/getSuggestedAreas'));
    })
  );

});