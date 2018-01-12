import { Project } from '../../../../core/project.model';
import { Component, OnInit, Inject } from '@angular/core';
import { StudentProjectsTableComponent } from 'app/student/student-projects/student-projects-table/student-projects-table.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-student-projects-dialog',
  templateUrl: './student-projects-dialog.component.html',
  styleUrls: ['./student-projects-dialog.component.css']
})
export class StudentProjectsDialogComponent implements OnInit {
  project: Project;
  constructor(public dialogRef: MatDialogRef<StudentProjectsTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project }) {
    this.project = data.project;
  }

  ngOnInit() {

  }

  onContinue() {

  }

}
