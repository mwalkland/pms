import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Project } from '../../../../../core/project.model';
import { StudentService } from '../../../../student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentProjectsTableDialogComponent } from '../student-projects-table-dialog.component';

@Component({
  selector: 'app-student-projects-table-dialog-confirm',
  templateUrl: './student-projects-table-dialog-confirm.component.html',
  styleUrls: ['./student-projects-table-dialog-confirm.component.css']
})
export class StudentProjectsTableDialogConfirmComponent implements OnInit {
  project: Project;

  constructor(public dialogRef: MatDialogRef<StudentProjectsTableDialogComponent>,
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
