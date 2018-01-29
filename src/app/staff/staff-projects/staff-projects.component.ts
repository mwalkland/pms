import { Component, OnInit } from '@angular/core';
import { Project } from '../../core/project.model';
import { StaffService } from '../staff.service';
import { MatDialog } from '@angular/material';
import { StaffProjectsEditComponent } from './staff-projects-edit/staff-projects-edit.component';

@Component({
  selector: 'app-staff-projects',
  templateUrl: './staff-projects.component.html',
  styleUrls: ['./staff-projects.component.css']
})
export class StaffProjectsComponent implements OnInit {

  projects: Project[]
  loaded = false;

  constructor(private staffService: StaffService, private dialog: MatDialog) { }

  ngOnInit() {
    this.staffService.getStaffProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      this.loaded = true;
    });
    this.staffService.updateProjectInList.subscribe((updatedProject: Project) => {
      this.projects[this.projects.findIndex(proj => proj.id === updatedProject.id)] = updatedProject;
    })
  }

  onEdit(project: Project) {
    this.dialog.open(StaffProjectsEditComponent, {
      data: { project: project },
      minWidth: '80vw'
    });

  }

}
