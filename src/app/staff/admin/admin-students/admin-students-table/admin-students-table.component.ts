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
  @ViewChild(MatSort) set sort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  filterBy: string;
  loaded = false;

  constructor(private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit() {
    this.adminService.getAllStudents().subscribe((students: Student[]) => {
      this.students = students;
      this.dataSource.data = students;
      this.loaded = true;
    });
    this.dataSource.filterPredicate = (data: Student, filter: string) => {
      return data.confirmed === filter;
    }
  }

  ngAfterViewInit() {
    this.dataSource.filter = this.filterBy;
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
