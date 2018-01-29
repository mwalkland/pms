import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StaffNewProjectComponent } from '../../../staff-new-project/staff-new-project.component';
import { Project } from '../../../../core/project.model';
import { User } from '../../../../auth/user.model';
import { StaffService } from '../../../staff.service';

@Component({
  selector: 'app-staff-profile-requests-confirm',
  templateUrl: './staff-profile-requests-confirm.component.html',
  styleUrls: ['./staff-profile-requests-confirm.component.css']
})
export class StaffProfileRequestsConfirmComponent implements OnInit {
  project: Project;
  confirm: boolean;
  error = false;

  constructor(private staffService: StaffService,
    public dialogRef: MatDialogRef<StaffNewProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project, confirm: boolean }) {
    this.project = data.project;
    this.confirm = data.confirm;
  }

  ngOnInit() {
  }

  onConfirm() {
    this.staffService.confirmProject(this.project, this.project.student.id).subscribe(
      response => {
        this.dialogRef.close();
        this.staffService.removeProjectFromRequests.next(this.project);
        this.staffService.addProjectToConfirmed.next({ project: this.project });
      }, error => {
        this.error = true;
      });
  }

  onReject() {
    this.staffService.rejectProject(this.project, this.project.student.id).subscribe(
      response => {
        this.dialogRef.close();
        this.staffService.removeProjectFromRequests.next(this.project);
      }, error => {
        this.error = true;
      })
  }

}
