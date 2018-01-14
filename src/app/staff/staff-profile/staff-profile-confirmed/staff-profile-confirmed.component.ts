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
  noOfProjects = 0;

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.staffService.getConfirmedProjects().subscribe(projects => {
      this.projects = projects;

      for (const project of projects) {
        this.noOfProjects += project.students.length;
      }
    })
  }

}
