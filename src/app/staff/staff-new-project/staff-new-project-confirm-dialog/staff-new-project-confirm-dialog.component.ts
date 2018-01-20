import { Project } from '../../../core/project.model';
import { StaffService } from '../../staff.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StaffNewProjectComponent } from '../staff-new-project.component';

@Component({
  selector: 'app-staff-new-project-confirm-dialog',
  templateUrl: './staff-new-project-confirm-dialog.component.html',
  styleUrls: ['./staff-new-project-confirm-dialog.component.css']
})
export class StaffNewProjectConfirmDialogComponent implements OnInit {
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
