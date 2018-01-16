import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StaffProfileDetailsEditComponent } from './staff-profile-details-edit/staff-profile-details-edit.component';
import { StaffService } from '../../staff.service';
import { Areas } from './areas.model';

@Component({
  selector: 'app-staff-profile-details',
  templateUrl: './staff-profile-details.component.html',
  styleUrls: ['./staff-profile-details.component.css']
})
export class StaffProfileDetailsComponent implements OnInit {
  areas: Areas;

  constructor(private staffService: StaffService, private dialog: MatDialog) { }

  ngOnInit() {
    this.staffService.getStaffAreas().subscribe(areas => {
      this.areas = areas;
    });
  }

  onEdit() {
    this.dialog.open(StaffProfileDetailsEditComponent, {
      data: { areas: this.areas },
      autoFocus: false
    });
  }

}
