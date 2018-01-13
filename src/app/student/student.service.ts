import { Subject, Observable } from 'rxjs/Rx';
import { Project } from '../core/project.model';
import { User } from '../auth/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class StudentService {
  private _staff: User[];
  private _areas: string[];
  private _projects: Project[];
  browseBy = 'Staff';
  browseByChanged = new Subject<string>();
  filterSelected = new Subject<string>();

  constructor(private http: HttpClient) { }

  changeBrowseBy(browse: string) {
    this.browseBy = browse;
    this.browseByChanged.next(browse);
  }

  getBrowseBy(): string {
    return this.browseBy;
  }

  get staff(): User[] {
    return this._staff;
  }

  set staff(staff: User[]) {
    this._staff = staff;
  }

  get projects(): Project[] {
    return this._projects;
  }

  set projects(projects: Project[]) {
    this._projects = projects;
  }

  get areas(): string[] {
    return this._areas
  }

  set areas(areas: string[]) {
    this._areas = areas;
  }

  changeFilter(filter: string) {
    this.filterSelected.next(filter);
  }

  getStaff(): Observable<User[]> {
    if (this.staff == null) {
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
    } else {
      return Observable.of(this.staff);
    }
  }

  getAreas(): Observable<string[]> {
    if (this.areas == null) {
      const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
      return this.http.get('http://localhost:3000/project/getAreas' + token)
        .map((response: Response) => {
          this.areas = response['obj'];
          return response['obj'];
        });
    } else {
      return Observable.of(this.areas);
    }
  }

  getAllProjects(): Observable<Project[]> {
    if (this.projects == null) {
      const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
      return this.http.get('http://localhost:3000/project/getAllProjects' + token)
        .map((response: Response) => {
          const projects = response['projects'];
          const projectList: Project[] = [];
          for (const project of projects) {
            const newProject = new Project(
              project._id, project.name, project.description, project.type, project.maxStudents, project.areas, project.staff
            );
            projectList.push(newProject);
          }
          this.projects = projectList;
          return projectList;
        });
    } else {
      return Observable.of(this.projects);
    }
  }

  updateStudentProject(project: Project) {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = JSON.stringify(project);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch('http://localhost:3000/user/addStudentProject' + token, body, { headers: headers })
  }

}