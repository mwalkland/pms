import { StudentProjectsTableComponent } from '../student-projects-table.component';
import { Project } from '../../../../core/project.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { StudentProjectsDialogConfirmComponent } from './student-projects-dialog-confirm/student-projects-dialog-confirm.component';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-student-projects-dialog',
  templateUrl: './student-projects-dialog.component.html',
  styleUrls: ['./student-projects-dialog.component.css']
})
export class StudentProjectsDialogComponent implements OnInit {
  project: Project;
  projectChosen: boolean;
  constructor(public dialogRef: MatDialogRef<StudentProjectsTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project },
    private dialog: MatDialog,
    private authService: AuthService) {
    this.project = data.project;
  }

  ngOnInit() {
    this.projectChosen = this.authService.hasProjectChosen();
  }

  onContinue() {
    this.dialog.open(StudentProjectsDialogConfirmComponent, {
      data: { project: this.project }
    });
  }

}
