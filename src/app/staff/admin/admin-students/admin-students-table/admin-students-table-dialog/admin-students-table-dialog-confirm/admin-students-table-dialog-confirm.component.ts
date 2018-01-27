import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AdminService } from '../../../../admin.service';

@Component({
  selector: 'app-admin-students-table-dialog-confirm',
  templateUrl: './admin-students-table-dialog-confirm.component.html',
  styleUrls: ['./admin-students-table-dialog-confirm.component.css']
})
export class AdminStudentsTableDialogConfirmComponent implements OnInit {

  staffId: string;

  constructor( @Inject(MAT_DIALOG_DATA) public data: { staffId: string },
    private adminService: AdminService,
    private dialog: MatDialog) {
    this.staffId = data.staffId;
  }

  ngOnInit() {
  }

  confirmEdit() {
    this.adminService.modifyProjectSupervisor({ staffId: this.staffId });
  }
}
