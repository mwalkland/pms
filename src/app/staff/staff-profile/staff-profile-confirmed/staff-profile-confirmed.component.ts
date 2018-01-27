import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../staff.service';
import { Project } from '../../../core/project.model';

@Component({
  selector: 'app-staff-profile-confirmed',
  templateUrl: './staff-profile-confirmed.component.html',
  styleUrls: ['./staff-profile-confirmed.component.css']
})
export class StaffProfileConfirmedComponent implements OnInit {
  projects: Project[]

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.staffService.getConfirmedProjects().subscribe(projects => {
      this.projects = projects;
    });
    this.staffService.addProjectToConfirmed.subscribe(response => {
      const project = response.project;
      this.projects.push(project)
    });
  }

}
