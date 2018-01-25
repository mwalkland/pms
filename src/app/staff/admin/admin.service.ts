import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../auth/user.model';
import { Student } from './student.model';
import { Project } from '../../core/project.model';
import { Staff } from './staff.model';

@Injectable()
export class AdminService {

  students: Student[];
  staff: Staff[];

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    if (this.students == null) {
      const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
      return this.http.get('http://localhost:3000/admin/getAllStudents' + token)
        .map(response => {
          const students = response['students'];
          const studentList: Student[] = [];
          for (const student of students) {
            const project = student.studentInfo.chosenProject;
            const newStudent = new Student(
              student._id,
              student.email,
              student.firstname,
              student.surname,
              project ? project.name : 'N/A',
              project ? project.staff.firstname + ' ' + project.staff.surname : 'N/A',
              student.studentInfo.confirmed ? 'Yes' : 'No'
            );
            studentList.push(newStudent);
          }
          this.students = studentList;
          return studentList;
        });
    } else {
      return Observable.of(this.students);
    }
  }

  getAllStaff(): Observable<Staff[]> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/admin/getAllStaff' + token)
      .map(response => {
        const staffResponse = response['staff'];
        const staffList: Staff[] = [];
        for (const staff of staffResponse) {
          let noOfStudents = 0;
          for (const project of staff.staffInfo.suggestedProjects) {
            noOfStudents += project.students.length;
          }
          const newStudent = new Staff(
            staff._id,
            staff.email,
            staff.firstname,
            staff.surname,
            staff.staffInfo.suggestedProjects,
            noOfStudents
          );
          staffList.push(newStudent);
        }
        this.staff = staffList;
        return staffList;
      });
  }

  sendReminder() {

  }

}