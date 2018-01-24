import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../auth/user.model';
import { Student } from './student.model';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/admin/getAllStudents' + token)
      .map(response => {
        const students = response['students'];
        const studentList: Student[] = [];
        for (const student of students) {
          const newStudent = new Student(
            student._id,
            student.email,
            student.firstname,
            student.surname,
            student.studentInfo.chosenProject,
            student.studentInfo.confirmed
          );
          studentList.push(newStudent);
        }
        return studentList;
      });
  }

}