import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openLogoutDialog() {
    const dialogRef = this.dialog.open(LogoutDialogComponent);
  }

}
