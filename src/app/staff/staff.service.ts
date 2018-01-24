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
  addProjectToConfirmed = new Subject<{ project: Project, student: User }>();
  updateProjectInList = new Subject<Project>();

  constructor(private http: HttpClient) { }

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
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/project/getStaffProjects' + token)
      .map(response => {
        const projects = response['projects'];
        const projectList: Project[] = [];
        for (const project of projects) {
          const newProject = new Project(
            project._id, project.name, project.description, project.type, project.maxStudents, project.areas,
            project.staff, project.pendingStudents, null, null, project.students, project.isStudentProject
          );
          projectList.push(newProject);
        }
        return projectList;
      });
  }

  getProjectRequests(): Observable<Project[]> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/project/getProjectRequests' + token)
      .map((response) => {
        const projects = response['projects'];
        const projectList: Project[] = [];
        for (const project of projects) {
          const newProject = new Project(
            project._id, project.name, project.description, project.type, project.maxStudents, project.areas,
            project.staff, project.pendingStudents, null, null, project.students, project.isStudentProject
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
        const projects = response['projects'];
        const projectList: Project[] = [];
        for (const project of projects) {
          const newProject = new Project(
            project._id, project.name, project.description, project.type, project.maxStudents, project.areas,
            project.staff, null, null, null, project.students
          );
          projectList.push(newProject);
        }
        return projectList;
      });
  }

  confirmProject(project: Project, student: User): Observable<Object> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = {
      project: project,
      student: student
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch('http://localhost:3000/project/confirmProject' + token, body, { headers: headers });
  }

  rejectProject(project: Project, student: User): Observable<Object> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = {
      project: project,
      student: student
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch('http://localhost:3000/project/rejectProject' + token, body, { headers: headers });
  }

  getSuggestedAreas(): Observable<string[]> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/project/getSuggestedAreas' + token)
      .map((response: { areas: string[] }) => {
        return response.areas;
      });
  }

}