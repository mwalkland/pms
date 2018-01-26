import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { AdminService } from '../../admin.service';
import { Project } from '../../project.model';
import { AdminModifyTableDialogComponent } from './admin-modify-table-dialog/admin-modify-table-dialog.component';

@Component({
  selector: 'app-admin-modify-table',
  templateUrl: './admin-modify-table.component.html',
  styleUrls: ['./admin-modify-table.component.css']
})
export class AdminModifyTableComponent implements OnInit, AfterViewInit {

  projects: Project[];
  dataSource = new MatTableDataSource<Project>();
  displayedColumns = ['name', 'studentName', 'staffName', 'type'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit() {
    this.adminService.getAllProjects().subscribe((projects: Project[]) => {
      console.log(projects);
      this.projects = projects;
      this.dataSource.data = projects;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(project: Project) {
    this.dialog.open(AdminModifyTableDialogComponent, {
      data: { project: project },
      minWidth: 350
    });
  }
}
