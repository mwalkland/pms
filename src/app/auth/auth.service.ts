import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  notifyLogout = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/auth/signup', body, { headers: headers });
  }

  login(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/auth/login', body, { headers: headers })
      .map(data => {
        const currentUser = {
          email: data['email'],
          name: data['name'],
          type: data['type'],
          projectChosen: data['projectChosen'],
          isLeader: data['leader']
        };
        localStorage.setItem('token', data['token']);
        localStorage.setItem('user', JSON.stringify(currentUser));
        this.router.navigate(['/' + data['type']]);
      });
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

}