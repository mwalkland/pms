import { StudentProjectsTableComponent } from '../student-projects-table.component';
import { Project } from '../../../../core/project.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthService } from '../../../../auth/auth.service';
import {
  StudentProjectsTableDialogConfirmComponent
} from './student-projects-table-dialog-confirm/student-projects-table-dialog-confirm.component';

@Component({
  selector: 'app-student-projects-table-dialog',
  templateUrl: './student-projects-table-dialog.component.html',
  styleUrls: ['./student-projects-table-dialog.component.css']
})
export class StudentProjectsTableDialogComponent implements OnInit {
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
    this.dialog.open(StudentProjectsTableDialogConfirmComponent, {
      data: { project: this.project }
    });
  }

}
