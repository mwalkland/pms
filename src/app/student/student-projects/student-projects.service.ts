import { Observable, Subject } from 'rxjs/Rx';
import { User } from './../../auth/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class StudentProjectsService {
  private staff: User[];
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

  getStaff() {
    return this.http.get('http://localhost:3000/user/getStaff')
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