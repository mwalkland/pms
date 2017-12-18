import { Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StaffService {

  resetForm = new Subject<void>();

  constructor(private http: HttpClient) { }

  newProject(project) {
    console.log(project);
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = JSON.stringify(project);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/project/new' + token, body, { headers: headers });
  }

}