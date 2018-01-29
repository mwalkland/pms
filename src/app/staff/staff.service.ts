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
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = JSON.stringify(project);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/project/new' + token, body, { headers: headers });
  }

  updateStaffProject(project: Project): Observable<Object> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = JSON.stringify(project);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch('http://localhost:3000/project/updateStaffProject' + token, body, { headers: headers });
  }

  getStaffAreas(): Observable<Areas> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/user/getStaffAreas' + token)
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
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(areas);
    return this.http.patch('http://localhost:3000/user/updateStaffAreas' + token, body, { headers: headers });
  }

  getStaffProjects(): Observable<Project[]> {
    if (!this.staffProjects) {
      const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
      return this.http.get('http://localhost:3000/project/getStaffProjects' + token)
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
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/project/getProjectRequests' + token)
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
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/project/getConfirmedProjects' + token)
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
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = {
      project: project,
      studentId: studentId
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch('http://localhost:3000/project/confirmProject' + token, body, { headers: headers });
  }

  rejectProject(project: Project, studentId: string): Observable<Object> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = {
      project: project,
      studentId: studentId
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch('http://localhost:3000/project/rejectProject' + token, body, { headers: headers });
  }

  getSuggestedAreas(): Observable<string[]> {
    if (!this.suggestedAreas) {
      const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
      return this.http.get('http://localhost:3000/project/getSuggestedAreas' + token)
        .map((response: { areas: string[] }) => {
          this.suggestedAreas = response.areas;
          return response.areas;
        });
    } else {
      return Observable.of(this.suggestedAreas);
    }
  }

}