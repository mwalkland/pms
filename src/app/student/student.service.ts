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
  private _suggestedAreas: string[];
  browseBy = 'Staff';
  browseByChanged = new Subject<string>();
  filterSelected = new Subject<string>();
  selectStaffMember = new Subject<User>();

  constructor(private http: HttpClient) { }

  changeBrowseBy(browse: string) {
    this.browseBy = browse;
    this.browseByChanged.next(browse);
  }

  getBrowseBy(): string {
    return this.browseBy;
  }

  hasProjectChosen(): boolean {
    return JSON.parse(localStorage.getItem('user')).projectChosen;
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

  get suggestedAreas(): string[] {
    return this._suggestedAreas;
  }

  set suggestedAreas(areas: string[]) {
    this._suggestedAreas = areas;
  }

  changeFilter(filter: string) {
    this.filterSelected.next(filter);
  }

  getStaff(): Observable<User[]> {
    if (!this.staff) {
      return this.http.get('http://localhost:3000/user/getStaff')
        .map((response: Response) => {
          const staffList = response['staff'];
          const sList: User[] = [];
          for (const staff of staffList) {
            const newStaff = new User(
              staff.email, staff.password, staff.firstname, staff.surname, staff.type, null, staff.staffInfo.areas, staff._id
            );
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
    if (!this.areas) {
      return this.http.get('http://localhost:3000/project/getAreas')
        .map((response: Response) => {
          this.areas = response['areas'];
          return response['areas'];
        });
    } else {
      return Observable.of(this.areas);
    }
  }

  getStaffProjects(): Observable<Project[]> {
    if (!this.projects) {
      return this.http.get('http://localhost:3000/project/getAllStaffProjects')
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

  getStudentProject(): Observable<Project> {
    return this.http.get('http://localhost:3000/project/getStudentProject')
      .map((response: Response) => {
        const project = response['project'];
        const supervisor = response['supervisor'];
        let newProject: Project;
        if (project) {
          newProject = new Project(
            project._id,
            project.name,
            project.description,
            project.type,
            project.maxStudents,
            project.areas,
            supervisor
          );
        }
        return newProject;
      });
  }

  addStudentProject(project: Project) {
    const body = JSON.stringify(project);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch('http://localhost:3000/project/addStudentProject', body, { headers: headers })
  }

  createStudentProject(project: Project) {
    const body = JSON.stringify(project);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/project/createStudentProject', body, { headers: headers })
  }

  getSuggestedAreas(): Observable<string[]> {
    if (!this.suggestedAreas) {
      return this.http.get('http://localhost:3000/project/getSuggestedAreas')
        .map((response: { areas: string[] }) => {
          this.suggestedAreas = response.areas;
          return response.areas;
        });
    } else {
      return Observable.of(this.suggestedAreas);
    }
  }

}