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
  isNotEmpty: boolean;
  loaded = false;

  constructor(private staffService: StaffService, private dialog: MatDialog) { }

  ngOnInit() {
    this.staffService.getStaffAreas().subscribe(areas => {
      this.areas = areas;
      Object.keys(this.areas).forEach((key) => {
        if (this.areas[key] !== '') {
          this.isNotEmpty = true;
        }
      });
      this.loaded = true;
    });
  }

  onEdit() {
    this.dialog.open(StaffProfileDetailsEditComponent, {
      data: { areas: this.areas },
      autoFocus: false
    });
  }

}
