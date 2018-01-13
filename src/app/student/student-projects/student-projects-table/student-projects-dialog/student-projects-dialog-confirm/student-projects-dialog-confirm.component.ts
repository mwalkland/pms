import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Project } from '../../../../../core/project.model';
import { StudentService } from '../../../../student.service';
import { StudentProjectsDialogComponent } from '../student-projects-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-projects-dialog-confirm',
  templateUrl: './student-projects-dialog-confirm.component.html',
  styleUrls: ['./student-projects-dialog-confirm.component.css']
})
export class StudentProjectsDialogConfirmComponent implements OnInit {
  project: Project;

  constructor(public dialogRef: MatDialogRef<StudentProjectsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project },
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) {
    this.project = data.project;
  }

  ngOnInit() {
  }

  onConfirm() {
    this.studentService.updateStudentProject(this.project).subscribe(() => {
      this.dialog.closeAll();
      this.router.navigate(['/student/confirmation']);
    });
  }

}
