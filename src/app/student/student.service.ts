import { Project } from '../core/project.model';
import { User } from '../auth/user.model';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class StudentService {
  private _staff: User[];
  private _areas: string[];
  private _projects: Project[];
  browseBy = 'Staff';
  browseByChanged = new Subject<string>();
  filterSelected = new Subject<Object>();

  constructor(private http: HttpClient) { }

  changeBrowseBy(browse: string) {
    this.browseBy = browse;
    this.browseByChanged.next(browse);
  }

  getBrowseBy(): string {
    return this.browseBy;
  }

  get staff() {
    return this._staff;
  }

  set staff(staff: User[]) {
    this._staff = staff;
  }

  get projects() {
    return this._projects;
  }

  set projects(projects: Project[]) {
    this._projects = projects;
  }

  changeFilter(filterObj: { type: string, filter: any }) {
    if (filterObj.type === 'Area') {
      this.getAreaProjects(filterObj.filter);
    } else {
      this.getStaffProjects(filterObj.filter);
    }
  }

  getStaff(): Observable<User[]> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/user/getStaff' + token)
      .map((response: Response) => {
        const staffList = response['staff'];
        const sList: User[] = [];
        for (const staff of staffList) {
          const newStaff = new User(staff.email, staff.password, staff.firstname, staff.surname, staff.type);
          sList.push(newStaff);
        }
        this.staff = sList;
        return sList;
      })
  }

  getAreas(): Observable<string[]> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/project/getAreas' + token)
      .map((response: Response) => {
        return response['obj'];
      });
  }

  getAllProjects(): Observable<Project[]> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/project/getAllProjects' + token)
      .map((response: Response) => {
        const projects = response['projects'];
        const projectList: Project[] = [];
        for (const project of projects) {
          const newProject = new Project(project.name, project.description, project.maxStudents, project.areas, project.staff);
          projectList.push(newProject);
        }
        this.projects = projectList;
        console.log(projectList);
        return projectList;
      });
  }

  getStaffProjects(user: User): Observable<Project[]> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const first = '&first=' + user.firstname;
    const surname = '&surname=' + user.surname;
    return this.http.get('http://localhost:3000/project/getStaffProjects' + token + first + surname)
      .map((response: Response) => {
        const projects = response['projects'];
        const projectList: Project[] = [];
        for (const project of projects) {
          const newProject = new Project(project.name, project.description, project.maxStudents, project.areas);
          projectList.push(newProject);
        }
        this.projects = projectList;
        return projectList;
      });
  }

  getAreaProjects(filter: string): Observable<Project[]> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

    return null;
  }

}