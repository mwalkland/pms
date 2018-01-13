import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  private user: User;
  notifyLogout = new Subject<any>();

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    return this.user;
  }

  setCurrentUser(user: User) {
    this.user = user;
  }

  hasProjectChosen(): boolean {
    return this.user.projectChosen;
  }

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/auth/signup', body, { headers: headers });
  }

  login(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/auth/login', body, { headers: headers });
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    const body = { token: token };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/auth/verify', body, { headers: headers });
  }

  notifyLogoutEvent() {
    this.notifyLogout.next();
  }

  logout() {
    localStorage.clear();
  }

}