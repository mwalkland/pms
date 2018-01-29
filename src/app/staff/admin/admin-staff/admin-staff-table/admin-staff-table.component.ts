import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Staff } from '../../staff.model';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { AdminService } from '../../admin.service';
import { AdminStaffTableDialogComponent } from './admin-staff-table-dialog/admin-staff-table-dialog.component';

@Component({
  selector: 'app-admin-staff-table',
  templateUrl: './admin-staff-table.component.html',
  styleUrls: ['./admin-staff-table.component.css']
})
export class AdminStaffTableComponent implements OnInit, AfterViewInit {

  staff: Staff[];
  dataSource = new MatTableDataSource<Staff>();
  displayedColumns = ['firstname', 'surname', 'email', 'noOfStudents'];
  @ViewChild(MatSort) sort: MatSort;
  loaded = false;

  constructor(private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit() {
    this.adminService.getAllStaff().subscribe((staff: Staff[]) => {
      this.staff = staff;
      this.dataSource.data = staff;
      this.loaded = true;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openDialog(staff: Staff) {
    this.dialog.open(AdminStaffTableDialogComponent, {
      data: { staff: staff }
    });
  }

}
