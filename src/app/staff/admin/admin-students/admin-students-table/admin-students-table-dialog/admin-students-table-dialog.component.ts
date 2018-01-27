import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Student } from '../../../student.model';
import { FormControl } from '@angular/forms';
import { AdminService } from '../../../admin.service';
import { Staff } from '../../../staff.model';
// tslint:disable-next-line:max-line-length
import { AdminStudentsTableDialogConfirmComponent } from './admin-students-table-dialog-confirm/admin-students-table-dialog-confirm.component';

@Component({
  selector: 'app-admin-students-table-dialog',
  templateUrl: './admin-students-table-dialog.component.html',
  styleUrls: ['./admin-students-table-dialog.component.css']
})
export class AdminStudentsTableDialogComponent implements OnInit {

  student: Student;
  staffList: Staff[];
  editStaff: FormControl;
  buttonDisabled = false;


  constructor( @Inject(MAT_DIALOG_DATA) public data: { student: Student },
    private adminService: AdminService,
    private dialog: MatDialog) {
    this.student = data.student;
  }

  ngOnInit() {
    this.adminService.getAllStaff().subscribe((staff: Staff[]) => {
      this.staffList = staff;
    });
    if (this.student.supervisor) {
      this.editStaff = new FormControl(this.student.supervisor._id);
    }
  }

  onEdit() {
    document.getElementById('edit-dropdown').style.display = 'block';
    document.getElementById('supervisor').style.display = 'none';
    this.buttonDisabled = true;
  }

  confirmEdit() {
    this.dialog.open(AdminStudentsTableDialogConfirmComponent, {
      data: { staffId: this.editStaff.value }
    })
  }

}
