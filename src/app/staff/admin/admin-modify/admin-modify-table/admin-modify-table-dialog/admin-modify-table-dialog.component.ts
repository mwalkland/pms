import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { Project } from '../../../project.model';
import { MAT_DIALOG_DATA, MatFormField, MatDialog } from '@angular/material';
import { Staff } from '../../../staff.model';
import { AdminService } from '../../../admin.service';
import { FormControl } from '@angular/forms';
import { AdminModifyTableDialogConfirmComponent } from './admin-modify-table-dialog-confirm/admin-modify-table-dialog-confirm.component';


@Component({
  selector: 'app-admin-modify-table-dialog',
  templateUrl: './admin-modify-table-dialog.component.html',
  styleUrls: ['./admin-modify-table-dialog.component.css']
})
export class AdminModifyTableDialogComponent implements OnInit {

  project: Project;
  staffList: Staff[];
  @ViewChild('editStaffDropdown') dropdown: ElementRef;
  editStaff: FormControl;
  buttonDisabled = false;

  constructor( @Inject(MAT_DIALOG_DATA) public data: { project: Project },
    private adminService: AdminService,
    private dialog: MatDialog) {
    this.project = data.project;
  }

  ngOnInit() {
    this.adminService.getAllStaff().subscribe((staff: Staff[]) => {
      this.staffList = staff;
    });
    this.editStaff = new FormControl(this.project.staffId);
  }

  onEdit() {
    document.getElementById('edit-dropdown').style.display = 'block';
    document.getElementById('supervisor').style.display = 'none';
    this.buttonDisabled = true;
  }

  confirmEdit() {
    this.dialog.open(AdminModifyTableDialogConfirmComponent, {
      data: { staffId: this.editStaff.value }
    })
  }

}
