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
    if (this.students == null) {
      const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
      return this.http.get('http://localhost:3000/admin/getAllStudents' + token)
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
              supervisor,
              student.studentInfo.confirmed ? 'Yes' : 'No',
              project ? project.description : null
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

  getAllStaff() {
    if (this.staff == null) {

      const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
      return this.http.get('http://localhost:3000/admin/getAllStaff' + token)
        .map(response => {
          const staffList: Staff[] = [];
          const studentResponse = response['students'];
          const staffResponse = response['staff'];
          for (const staff of staffResponse) {
            const staffProjects = [];
            for (const student of studentResponse) {
              if (student.studentInfo.supervisor && student.studentInfo.supervisor._id === staff._id) {
                staffProjects.push(student.studentInfo.chosenProject);
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
          console.log(staffList)
          this.staff = staffList;
          return staffList;
        });
    } else {
      return Observable.of(this.staff);
    }
  }

  getAllProjects(): Observable<Project[]> {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get('http://localhost:3000/admin/getAllProjects' + token)
      .map(response => {
        const projectResponse = response['projects'];
        const projectList: Project[] = [];
        for (const project of projectResponse) {
          for (const student of project.students) {
            const newProject = new Project(
              project.name,
              project.areas,
              project.staff.firstname + ' ' + project.staff.surname,
              project.staff.email,
              project.staff._id,
              student.firstname + ' ' + student.surname,
              project.isStudentProject ? 'Student' : 'Staff'
            );
            projectList.push(newProject);
          }
        }
        this.projects = projectList;
        return projectList;
      });
  }

  modifyProjectSupervisor(staff: { staffId: string }) {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = JSON.stringify(staff);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch('http://localhost:3000/admin/modifyProjectSupervisor' + token, body, { headers: headers });
  }

  sendReminder() {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    const body = {};
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/admin/sendReminder' + token, body, { headers: headers });
  }

}