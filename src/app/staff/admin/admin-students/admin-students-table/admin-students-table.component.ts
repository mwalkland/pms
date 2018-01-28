import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Student } from '../../student.model';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { AdminService } from '../../admin.service';
import { AdminStudentsTableDialogComponent } from './admin-students-table-dialog/admin-students-table-dialog.component';

@Component({
  selector: 'app-admin-students-table',
  templateUrl: './admin-students-table.component.html',
  styleUrls: ['./admin-students-table.component.css']
})
export class AdminStudentsTableComponent implements OnInit, AfterViewInit {

  students: Student[];
  dataSource = new MatTableDataSource<Student>();
  displayedColumns = ['firstname', 'surname', 'projectname', 'supervisorName', 'confirmed'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator
  filterBy: string;

  constructor(private adminService: AdminService, private dialog: MatDialog) { }

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
    this.dataSource.paginator = this.paginator;
  }

  changeFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  openDialog(student: Student) {
    this.dialog.open(AdminStudentsTableDialogComponent, {
      data: { student: student }
    })
  }

}
