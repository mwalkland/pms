import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-reminder',
  templateUrl: './admin-reminder.component.html',
  styleUrls: ['./admin-reminder.component.css']
})
export class AdminReminderComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  sendReminder() {
    this.adminService.sendReminder().subscribe();
  }

}
