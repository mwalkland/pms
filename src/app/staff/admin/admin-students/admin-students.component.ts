import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {
  students: Student[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllStudents().subscribe(students => this.students = students);
  }

}
