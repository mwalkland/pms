import { Component, OnInit } from '@angular/core';
import { Project } from '../../../core/project.model';
import { StaffService } from '../../staff.service';
import { User } from '../../../auth/user.model';
import { MatDialog } from '@angular/material';
import { StaffProfileRequestsConfirmComponent } from './staff-profile-requests-confirm/staff-profile-requests-confirm.component';

@Component({
  selector: 'app-staff-profile-requests',
  templateUrl: './staff-profile-requests.component.html',
  styleUrls: ['./staff-profile-requests.component.css']
})
export class StaffProfileRequestsComponent implements OnInit {
  projects: Project[];
  noOfProjects = 0;

  constructor(private staffService: StaffService, private dialog: MatDialog) { }

  ngOnInit() {
    this.staffService.getProjectRequests().subscribe(projects => {
      this.projects = projects;
      for (const project of projects) {
        this.noOfProjects += project.pendingStudents.length;
      }
    });
    this.staffService.removeProject.subscribe((project) => {
      this.projects.splice(this.projects.indexOf(project), 1);
    })
  }

  confirm(project: Project, student: User) {
    this.dialog.open(StaffProfileRequestsConfirmComponent, {
      data: {
        project: project,
        student: student,
        confirm: true
      }
    });
  }

  reject(project: Project, student: User) {
    this.dialog.open(StaffProfileRequestsConfirmComponent, {
      data: {
        project: project,
        student: student,
        confirm: false
      }
    });
  }
}
