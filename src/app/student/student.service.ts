import { User } from '../auth/user.model';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class StudentService {
  private _staff: User[];
  private _areas: string[];
  browseBy = 'Staff';
  browseByChanged = new Subject<string>();

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
    console.log('gdfggdf');
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/project/getAreas' + token)
      .map((response: Response) => {
        return response['obj'];
      });
  }

}