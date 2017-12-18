import { Project } from '../../../core/project.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { StudentService } from 'app/student/student.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

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

  constructor(private studentService: StudentService) { }

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

}
