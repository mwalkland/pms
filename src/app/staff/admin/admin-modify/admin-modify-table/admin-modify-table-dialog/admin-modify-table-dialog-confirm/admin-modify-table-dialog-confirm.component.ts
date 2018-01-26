import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AdminService } from '../../../../admin.service';

@Component({
  selector: 'app-admin-modify-table-dialog-confirm',
  templateUrl: './admin-modify-table-dialog-confirm.component.html',
  styleUrls: ['./admin-modify-table-dialog-confirm.component.css']
})
export class AdminModifyTableDialogConfirmComponent implements OnInit {

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
