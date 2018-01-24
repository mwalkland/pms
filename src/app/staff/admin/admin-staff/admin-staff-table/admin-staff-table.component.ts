import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Staff } from '../../staff.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-staff-table',
  templateUrl: './admin-staff-table.component.html',
  styleUrls: ['./admin-staff-table.component.css']
})
export class AdminStaffTableComponent implements OnInit, AfterViewInit {

  staff: Staff[];
  dataSource = new MatTableDataSource<Staff>();
  displayedColumns = ['firstname', 'surname', 'email', 'students'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllStaff().subscribe((staff: Staff[]) => {
      this.staff = staff;
      this.dataSource.data = staff;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
