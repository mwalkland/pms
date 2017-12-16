import { User } from '../auth/user.model';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class StudentService {
  private _staff: User[];
  browseBy: String;
  browseByChanged = new Subject<String>();

  constructor(private http: HttpClient) { }

  changeBrowseBy(browse: String) {
    this.browseBy = browse;
    this.browseByChanged.next(browse);
  }

  getBrowseBy(): String {
    return this.browseBy;
  }


  public get staff(): User[] {
    return this._staff;
  }


  public set staff(staff: User[]) {
    this._staff = staff;
  }

  getStaff() {
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

  getAreas() {

  }

}