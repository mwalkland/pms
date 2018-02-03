import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../auth/user.model';
import { Student } from './student.model';
import { Staff } from './staff.model';
import { Project } from './project.model';

@Injectable()
export class AdminService {

  students: Student[];
  staff: Staff[];
  projects: Project[];

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    if (!this.students) {
      return this.http.get('http://localhost:3000/admin/getAllStudents')
        .map(response => {
          const students = response['students'];
          const studentList: Student[] = [];
          for (const student of students) {
            const project = student.studentInfo.chosenProject;
            const supervisor = student.studentInfo.supervisor;
            const newStudent = new Student(
              student._id,
              student.email,
              student.firstname,
              student.surname,
              project ? project.name : 'N/A',
              new Staff(
                supervisor ? supervisor._id : '',
                supervisor ? supervisor.email : '',
                supervisor ? supervisor.firstname : 'N/A',
                supervisor ? supervisor.surname : '',
                null,
                null
              ),
              student.studentInfo.confirmed ? 'Yes' : 'No',
              project ? project.description : null,
              supervisor ? supervisor.firstname + ' ' + supervisor.surname : 'N/A'
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
    if (!this.staff) {
      return this.http.get('http://localhost:3000/admin/getAllStaff')
        .map(response => {
          const staffList: Staff[] = [];
          const studentResponse = response['students'];
          const staffResponse = response['staff'];
          for (const staff of staffResponse) {
            const staffProjects = [];
            for (const student of studentResponse) {
              if (student.studentInfo.supervisor && student.studentInfo.supervisor._id === staff._id) {
                const studentProject = student.studentInfo.chosenProject;
                staffProjects.push(new Project(
                  studentProject.name,
                  studentProject.description,
                  studentProject.areas,
                  staff.firstname + ' ' + staff.surname,
                  staff.email,
                  staff._id,
                  student.firstname + ' ' + student.surname,
                  studentProject.type,
                  student.studentInfo.confirmed
                ));
              }
            }
            const newStaff = new Staff(
              staff._id,
              staff.email,
              staff.firstname,
              staff.surname,
              staffProjects,
              staffProjects.length
            );
            staffList.push(newStaff);
          }
          this.staff = staffList;
          return staffList;
        });
    } else {
      return Observable.of(this.staff);
    }
  }

  modifyProjectSupervisor(staffId: string, studentId: string): Observable<Object> {
    const body = { staffId: staffId, studentId: studentId };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch('http://localhost:3000/admin/modifyProjectSupervisor', body, { headers: headers });
  }

  sendReminder() {
    const body = {};
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/admin/sendReminder', body, { headers: headers });
  }

  getSuggestedAreas(): Observable<string[]> {
    return this.http.get('http://localhost:3000/project/getSuggestedAreas')
      .map((response: { areas: string[] }) => {
        return response.areas;
      });
  }

  updateSuggestedAreas(areas: string[]) {
    const body = { areas: areas };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put('http://localhost:3000/admin/updateAreasList', body, { headers: headers });
  }

}