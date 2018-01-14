import { Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../core/project.model';
import { Observable } from 'rxjs/Observable';
import { User } from '../auth/user.model';

@Injectable()
export class StaffService {

  resetForm = new Subject<void>();
  removeProject = new Subject<Project>();

  constructor(private http: HttpClient) { }

  newProject(project: Project): Observable<Object> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = JSON.stringify(project);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/project/new' + token, body, { headers: headers });
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
            project.staff, project.pendingStudents
          );
          projectList.push(newProject);
        }
        return projectList;
      });
  }

  getConfirmedProjects() {
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

}