import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    public dialogRef: MatDialogRef<LogoutDialogComponent>) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
    this.dialogRef.close();
  }

  noLogout() {
    this.dialogRef.close();
  }

}
