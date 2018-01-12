import { Project } from '../../../core/project.model';
import { StaffService } from '../../staff.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StaffNewProjectComponent } from 'app/staff/staff-new-project/staff-new-project.component';

@Component({
  selector: 'app-staff-confirm-project-dialog',
  templateUrl: './staff-confirm-project-dialog.component.html',
  styleUrls: ['./staff-confirm-project-dialog.component.css']
})
export class StaffConfirmProjectDialogComponent implements OnInit {
  project: Project;

  constructor(
    private staffService: StaffService,
    public dialogRef: MatDialogRef<StaffNewProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project }) {

    this.project = data.project;
  }

  ngOnInit() {

  }

  onSubmit() {

    this.staffService.newProject(this.project).subscribe(
      response => {
        this.dialogRef.close();
        this.staffService.resetForm.next();
      }
      // error => {
      //   if (error.status === 401) {
      //     this.authError = true;
      //   }
      // }
    );
  }

}
