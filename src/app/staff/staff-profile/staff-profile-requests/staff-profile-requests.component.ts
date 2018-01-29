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
  loaded = false;

  constructor(private staffService: StaffService, private dialog: MatDialog) { }

  ngOnInit() {
    this.staffService.getProjectRequests().subscribe(projects => {
      this.projects = projects;
      this.loaded = true;
    });
    this.staffService.removeProjectFromRequests.subscribe((project) => {
      this.projects.splice(this.projects.indexOf(project), 1);
    });
  }

  confirm(project: Project) {
    this.dialog.open(StaffProfileRequestsConfirmComponent, {
      data: {
        project: project,
        confirm: true
      }
    });
  }

  reject(project: Project) {
    this.dialog.open(StaffProfileRequestsConfirmComponent, {
      data: {
        project: project,
        confirm: false
      }
    });
  }
}
