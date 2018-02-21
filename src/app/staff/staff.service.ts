import { Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../core/project.model';
import { Observable } from 'rxjs/Observable';
import { User } from '../auth/user.model';
import { Areas } from './staff-profile/staff-profile-details/areas.model';

@Injectable()
export class StaffService {

  resetForm = new Subject<void>();
  removeProjectFromRequests = new Subject<Project>();
  addProjectToConfirmed = new Subject<{ project: Project }>();
  updateProjectInList = new Subject<Project>();
  private _staffProjects: Project[];
  private _suggestedAreas: string[];

  constructor(private http: HttpClient) { }

  get staffProjects() {
    return this._staffProjects;
  }

  set staffProjects(projects: Project[]) {
    this._staffProjects = projects;
  }

  get suggestedAreas(): string[] {
    return this._suggestedAreas;
  }

  set suggestedAreas(areas: string[]) {
    this._suggestedAreas = areas;
  }

  isModuleLeader(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user['isLeader'];
  }

  newProject(project: Project): Observable<Object> {
    const body = JSON.stringify(project);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('/project/new', body, { headers: headers });
  }

  updateStaffProject(project: Project): Observable<Object> {
    const body = JSON.stringify(project);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch('/project/updateStaffProject', body, { headers: headers });
  }

  getStaffAreas(): Observable<Areas> {
    return this.http.get('/user/getStaffAreas')
      .map((response: {
        message: string,
        areas: {
          _id: string,
          staffInfo: {
            areas: {
              first: string,
              second: string,
              third: string,
              fourth: string,
              fifth: string
            }
          }
        }
      }) => {
        const areas = response.areas.staffInfo.areas;
        return new Areas(areas.first, areas.second, areas.third, areas.fourth, areas.fifth);
      });
  }

  updateStaffAreas(areas: Areas) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(areas);
    return this.http.patch('/user/updateStaffAreas', body, { headers: headers });
  }

  getStaffProjects(): Observable<Project[]> {
    if (!this.staffProjects) {
      return this.http.get('/project/getStaffProjects')
        .map(response => {
          const projects = response['projects'];
          const projectList: Project[] = [];
          for (const project of projects) {
            const newProject = new Project(
              project._id, project.name, project.description, project.type, project.maxStudents, project.areas,
              project.staff, null, null, project.students, project.isStudentProject
            );
            projectList.push(newProject);
          }
          this.staffProjects = projectList;
          return projectList;
        });
    } else {
      return Observable.of(this.staffProjects);
    }
  }

  getProjectRequests(): Observable<Project[]> {
    return this.http.get('/project/getProjectRequests')
      .map((response) => {
        const students = response['students'];
        const projectList: Project[] = [];
        for (const student of students) {
          const project = student.studentInfo.chosenProject;
          const newProject = new Project(
            project._id, project.name, project.description, project.type, project.maxStudents, project.areas,
            project.staff, null, null, project.isStudentProject,
            new User(student.email, null, student.firstname, student.surname,
              student.type, null, null, student._id)
          );
          projectList.push(newProject);
        }
        return projectList;
      });
  }

  getConfirmedProjects(): Observable<Project[]> {
    return this.http.get('/project/getConfirmedProjects')
      .map((response) => {
        const students = response['students'];
        const projectList: Project[] = [];
        for (const student of students) {
          const project = student.studentInfo.chosenProject;
          const newProject = new Project(
            project._id, project.name, project.description, project.type, project.maxStudents, project.areas,
            project.staff, null, null, project.isStudentProject,
            new User(student.email, null, student.firstname, student.surname,
              student.type, null, null, student._id)
          );
          projectList.push(newProject);
        }
        return projectList;
      });
  }

  confirmProject(project: Project, studentId: string): Observable<Object> {
    const body = {
      project: project,
      studentId: studentId
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch('/project/confirmProject', body, { headers: headers });
  }

  rejectProject(project: Project, studentId: string): Observable<Object> {
    const body = {
      project: project,
      studentId: studentId
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch('/project/rejectProject', body, { headers: headers });
  }

  getSuggestedAreas(): Observable<string[]> {
    if (!this.suggestedAreas) {
      return this.http.get('/project/getSuggestedAreas')
        .map((response: { areas: string[] }) => {
          this.suggestedAreas = response.areas;
          return response.areas;
        });
    } else {
      return Observable.of(this.suggestedAreas);
    }
  }

}