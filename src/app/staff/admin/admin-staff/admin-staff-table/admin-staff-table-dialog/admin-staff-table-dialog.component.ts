import { Component, OnInit, Inject } from '@angular/core';
import { Staff } from '../../../staff.model';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-admin-staff-table-dialog',
  templateUrl: './admin-staff-table-dialog.component.html',
  styleUrls: ['./admin-staff-table-dialog.component.css']
})
export class AdminStaffTableDialogComponent implements OnInit {

  staff: Staff;

  constructor( @Inject(MAT_DIALOG_DATA) public data: { staff: Staff }) {
    this.staff = data.staff;
  }

  ngOnInit() {

  }



}
