import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Student } from '../../student.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-students-table',
  templateUrl: './admin-students-table.component.html',
  styleUrls: ['./admin-students-table.component.css']
})
export class AdminStudentsTableComponent implements OnInit, AfterViewInit {

  students: Student[];
  dataSource = new MatTableDataSource<Student>();
  displayedColumns = ['firstname', 'surname', 'projectname', 'supervisor', 'confirmed'];
  @ViewChild(MatSort) sort: MatSort;
  filterBy: string;


  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllStudents().subscribe((students: Student[]) => {
      this.students = students;
      this.dataSource.data = students;
    });
    this.dataSource.filterPredicate = (data: Student, filter: string) => {
      return data.confirmed === filter;
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.filter = this.filterBy;
  }

  changeFilter(filter: string) {
    this.dataSource.filter = filter;
  }

}
