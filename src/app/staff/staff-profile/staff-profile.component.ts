import { Component, OnInit } from '@angular/core';
import { StaffService } from '../staff.service';
import { Project } from '../../core/project.model';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css']
})
export class StaffProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
