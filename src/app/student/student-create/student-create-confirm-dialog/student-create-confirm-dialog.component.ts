import { Component, OnInit, Inject } from '@angular/core';
import { StudentService } from '../../student.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentCreateComponent } from '../student-create.component';
import { User } from '../../../auth/user.model';
import { Project } from '../../../core/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create-confirm-dialog',
  templateUrl: './student-create-confirm-dialog.component.html',
  styleUrls: ['./student-create-confirm-dialog.component.css']
})
export class StudentCreateConfirmDialogComponent implements OnInit {
  project: Project;

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<StudentCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project },
    private router: Router) {

    this.project = data.project;
  }

  ngOnInit() {

  }

  onSubmit() {
    this.studentService.createStudentProject(this.project).subscribe(
      response => {
        this.dialogRef.close();
        this.router.navigate(['/student/confirmation']);
      }
    );
  }

}
