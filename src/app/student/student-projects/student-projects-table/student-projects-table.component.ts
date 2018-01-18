import { Project } from '../../../core/project.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { StudentService } from '../../student.service';
import { StudentProjectsTableDialogComponent } from './student-projects-table-dialog/student-projects-table-dialog.component';

@Component({
  selector: 'app-student-projects-table',
  templateUrl: './student-projects-table.component.html',
  styleUrls: ['./student-projects-table.component.css']
})
export class StudentProjectsTableComponent implements OnInit, AfterViewInit {

  projects: Project[];
  dataSource = new MatTableDataSource<Project>();
  displayedColumns = ['name', 'type', 'staff', 'areas'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private studentService: StudentService, private dialog: MatDialog) { }

  ngOnInit() {
    this.studentService.getAllProjects().subscribe((projects: Project[]) => {
      for (const project of projects) {
        const areas = project['areas'];
        let stringBuilder = '';
        for (const area of areas) {
          stringBuilder += area;
          stringBuilder += ', ';
        }
        stringBuilder = stringBuilder.replace(/,\s*$/, '');
        project.areaString = stringBuilder;
        project.staffName = project.staff.firstname + ' ' + project.staff.surname;
      }
      this.projects = projects;
      this.dataSource.data = projects;
    })
  }

  ngAfterViewInit() {
    this.dataSource.filter = '';
    this.dataSource.sort = this.sort;
    this.studentService.filterSelected.subscribe(filter => this.dataSource.filter = filter);
  }

  openDialog(project: Project) {
    this.dialog.open(StudentProjectsTableDialogComponent, {
      data: { project: project }
    });
  }

}
