import { Project } from '../../../core/project.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
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
  @ViewChild(MatSort) set sort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  loaded = false;

  constructor(private studentService: StudentService, private dialog: MatDialog) { }

  ngOnInit() {
    this.studentService.getStaffProjects().subscribe((projects: Project[]) => {
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
      this.loaded = true;
    })
  }

  ngAfterViewInit() {
    this.dataSource.filter = '';
    this.studentService.filterSelected.subscribe(filter => this.dataSource.filter = filter);
  }

  openDialog(project: Project) {
    this.dialog.open(StudentProjectsTableDialogComponent, {
      data: { project: project }
    });
  }

}
