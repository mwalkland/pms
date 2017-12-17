import { Project } from '../../../core/project.model';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'app/student/student.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-student-projects-table',
  templateUrl: './student-projects-table.component.html',
  styleUrls: ['./student-projects-table.component.css']
})
export class StudentProjectsTableComponent implements OnInit {

  projects: Project[];
  dataSource: MatTableDataSource<Project>;
  displayedColumns = ['name', 'staff', 'areas'];

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
      }
      this.projects = projects;
      this.dataSource = new MatTableDataSource(this.projects);
    });
  }

}
