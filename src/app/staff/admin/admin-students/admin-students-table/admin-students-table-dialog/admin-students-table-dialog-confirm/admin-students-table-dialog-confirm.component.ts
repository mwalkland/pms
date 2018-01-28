import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AdminService } from '../../../../admin.service';
import { Student } from '../../../../student.model';

@Component({
  selector: 'app-admin-students-table-dialog-confirm',
  templateUrl: './admin-students-table-dialog-confirm.component.html',
  styleUrls: ['./admin-students-table-dialog-confirm.component.css']
})
export class AdminStudentsTableDialogConfirmComponent implements OnInit {

  staffId: string;
  student: Student;
  error = false;

  constructor( @Inject(MAT_DIALOG_DATA) public data: { staffId: string, student: Student },
    private adminService: AdminService,
    private dialog: MatDialog) {
    this.staffId = data.staffId;
    this.student = data.student;
  }

  ngOnInit() {
  }

  confirmEdit() {
    this.adminService.modifyProjectSupervisor(this.staffId, this.student.id).subscribe(
      (response) => {
        this.dialog.closeAll();
      }, error => {
        this.error = true;
      });
  }
}
